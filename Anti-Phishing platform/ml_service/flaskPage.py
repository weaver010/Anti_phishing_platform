import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
from flask import Flask, request, jsonify
from urllib.parse import urlparse
import tldextract
import math

phishing_df = pd.read_csv('Phishing URLs.csv')
benign_df = pd.read_csv('URL dataset.csv')

phishing_df['label'] = 1
benign_df['label'] = 0

df = pd.concat([phishing_df[['url', 'label']], benign_df[['url', 'label']]], ignore_index=True)
df = df.dropna(subset=['url', 'label'])
df = df[df['url'].apply(lambda x: isinstance(x, str) and x.strip() != '' and '.' in x)]
df['label'] = df['label'].astype(int)


app = Flask(__name__)

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

# Load the trained model
model = joblib.load('rf_url_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    url = data.get('url')
    features = [extract_features(url)]
    pred = model.predict(features)[0]
    proba = model.predict_proba(features)[0][1]
    return jsonify({'is_phishing': bool(pred), 'probability': proba})

if __name__ == '__main__':
    app.run(port=5001)

