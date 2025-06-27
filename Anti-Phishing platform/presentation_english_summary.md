# URL Phishing Detection System
## English Summary Points for Presentation

### Introduction
- Welcome to the presentation of our graduation project on phishing detection
- The project focuses on URL analysis and phishing detection using AI and machine learning techniques
- We'll explain the main mechanisms for analyzing links and detecting malicious URLs

### System Overview
- Our system analyzes URLs through a sequence of steps:
  1. **URL Structure Analysis**: Examining components like domain, path, and query string
  2. **Feature Extraction**: Analyzing over 25 distinct features for each URL
  3. **Reputation Check**: Connecting to external security databases
  4. **Risk Score Calculation**: Evaluating phishing probability on a scale of 0 to 10
  5. **Final Verdict**: Classifying URLs as safe, suspicious, or phishing

### Main Functions

#### 1. URL Analysis (`analyze_url`)
- The primary function coordinating the entire analysis process
- Performs URL validation, whitelist checking, feature extraction, reputation checks, and final scoring
- Uses parallel processing for API checks to improve efficiency

#### 2. Feature Extraction (`extract_url_features`)
- Extracts comprehensive features from URLs for phishing detection
- Key features include:
  - URL and domain length
  - Number of subdomains
  - Presence of suspicious symbols like '@'
  - Use of suspicious TLDs
  - Presence of phishing-related keywords
  - Use of URL shortening services
  - HTTPS protocol usage
  - Text entropy (randomness) measurement

#### 3. Phishing Risk Score Calculation
- Core of the phishing detection system
- Combines local features (URL structure, length, entropy) with external information from security APIs
- Assigns weights to different features to calculate the final score
- Documents specific reasons contributing to the risk score

#### 4. Helper Functions for Specific Feature Detection
- **IP Address Check**: Detects direct IP usage instead of domain names
- **Suspicious TLD Check**: Identifies top-level domains commonly associated with phishing
- **URL Shortener Detection**: Identifies use of URL shortening services
- **Text Entropy Calculation**: Measures text randomness that might indicate algorithmically generated names

### Security API Integration
- Multiple external services used for URL reputation checking:
  1. **VirusTotal**: Aggregates results from multiple antivirus engines and URL scanners
  2. **Google Safe Browsing**: Checks if URLs are on Google's blacklist
  3. **IPQualityScore**: Analyzes URLs for phishing, malware, and other fraudulent content

### URL Classification Process
- After calculating the risk score, URLs are classified into categories:
  - **Legitimate**: Score ≤ 0.8
  - **Potentially Suspicious**: Score ≤ 2.0
  - **Suspicious**: Score ≤ 4.5
  - **Phishing**: Score > 4.5

### Conclusion
- Our phishing detection system provides a comprehensive approach to URL analysis
- Combines local feature analysis with global security database information
- Achieves high accuracy in detecting phishing attempts
- Can be integrated into web applications, email services, or internet browsing tools
- Provides additional protection for users against phishing attacks
