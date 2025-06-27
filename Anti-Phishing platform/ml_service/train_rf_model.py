import pandas as pd
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from urllib.parse import urlparse
import joblib
import re
import tldextract
import math

def shannon_entropy(s):
    prob = [float(s.count(c)) / len(s) for c in dict.fromkeys(list(s))]
    entropy = - sum([p * math.log2(p) for p in prob])
    return entropy

def extract_features(url):
    try:
        parsed = urlparse(url)
        ext = tldextract.extract(url)
        domain = ext.domain
        subdomain = ext.subdomain
        tld = ext.suffix
        is_ip = bool(re.match(r'^\d{1,3}(\.\d{1,3}){3}', parsed.netloc))
        suspicious_tlds = ['tk', 'ml', 'ga', 'cf', 'gq']
        shortening_services = ['bit.ly', 'goo.gl', 'tinyurl', 'ow.ly', 't.co']
        suspicious_words = ['login', 'secure', 'update', 'bank', 'account', 'verify']

        return [
            len(url),
            url.count('.'),
            int(parsed.scheme == 'https'),
            url.count('@'),
            url.count('-'),
            url.count('='),
            url.count('?'),
            url.count('&'),
            url.count('%'),
            url.count('/'),
            int('ipfs' in url or 'dweb' in url or 'webflow' in url or 'firebaseapp' in url or 'duckdns' in url),
            len(domain),
            len(subdomain),
            int(tld in suspicious_tlds),
            int(is_ip),
            int(any(s in url for s in shortening_services)),
            sum(word in url.lower() for word in suspicious_words),
            shannon_entropy(url)
        ]
    except Exception:
        return [0]*18

# Load phishing and legitimate data (headers present)
phishing_df = pd.read_csv('Phishing URLs.csv')  # columns: url,Type
phishing_df = phishing_df[['url']].copy()
phishing_df['label'] = 1

benign_df = pd.read_csv('URL dataset.csv')      # columns: url,type
benign_df = benign_df[['url']].copy()
benign_df['label'] = 0

# Combine and clean
df = pd.concat([phishing_df, benign_df], ignore_index=True)
df = df.dropna(subset=['url', 'label'])
df = df[df['url'].apply(lambda x: isinstance(x, str) and x.strip() != '' and '.' in x)]

# Debug: print info about labels
print("NaNs in label:", df['label'].isnull().sum())
print("Unique labels:", df['label'].unique())
print("Sample rows with NaN label:\n", df[df['label'].isnull()])

df['label'] = df['label'].astype(int)

print("Total samples after cleaning:", len(df))
print(df.head())

# Extract features and labels
X = df['url'].apply(extract_features).tolist()
y = df['label'].tolist()

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define base models
rf = RandomForestClassifier(n_estimators=100, random_state=42)
lr = LogisticRegression(max_iter=1000, random_state=42)

# Create a Voting Classifier
voting_clf = VotingClassifier(
    estimators=[('rf', rf), ('lr', lr)],
    voting='soft'  # 'soft' uses predicted probabilities, 'hard' uses predicted class labels
)

# Train ensemble model
voting_clf.fit(X_train, y_train)

# Save the ensemble model
joblib.dump(voting_clf, 'ensemble_url_model.joblib')