
import re
import math
import time
import hashlib
import ipaddress
from urllib.parse import urlparse, parse_qs
from concurrent.futures import ThreadPoolExecutor
import logging

# --- Configuration ---
# In a real application, these would be in a config file or environment variables
VIRUSTOTAL_API_KEY = "d7ee2d7c94d0ba8d9a97bc764cfe9c7c37432bab8d1476c942512826ef8f8194"
GOOGLE_SAFE_BROWSING_API_KEY = "AIzaSyCM9WZaOLC1O-C7epBAmtENMuQOIZcZZno"
IPQS_API_KEY = "IcAlI5MRNfDoE4UaUZia0bJghDy09qTo"
ABUSEIPDB_API_KEY = "dae094f3f4b729f5521d9d68d443553321cf5c195cc90ca6b17453219390492950305f384533da97"

WHITELISTED_URLS = ["linkedin.com", "google.com", "microsoft.com", "medium.com", "docs.google.com"]
PHISHING_KEYWORDS = [
    'account', 'alert', 'authenticate', 'bank', 'click', 'confirm', 'credit',
    'debit', 'expire', 'login', 'password', 'pay', 'purchase', 'secure',
    'update', 'urgent', 'verify', 'wallet', 'warning', 'unusual', 'activity',
    'action required', 'suspended', 'locked', 'compromised', 'identity'
]

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Placeholder API Functions (from gui.py) ---
# In a real application, these would be in a separate module
def api_request(url, method='get', headers=None, params=None, data=None, json_data=None, timeout=20):
    """
    Simulates making HTTP API requests to various security services.
    In a real implementation, this would use the 'requests' library to make actual API calls.
    For demonstration purposes, it returns mock responses based on the URL.
    
    Args:
        url: The API endpoint URL
        method: HTTP method (get/post)
        headers: HTTP headers dictionary
        params: URL query parameters
        data: Form data for POST requests
        json_data: JSON payload for POST requests
        timeout: Request timeout in seconds
        
    Returns:
        Dictionary with simulated API response data
    """
    # This is a placeholder. A real implementation would use the 'requests' library.
    logger.info(f"Making API request to {url}")
    # Simulate API responses for demonstration
    if "virustotal" in url:
        return {"data": {"attributes": {"last_analysis_stats": {"malicious": 0, "suspicious": 0}}}}
    if "safebrowsing" in url:
        return {}
    if "ipqualityscore" in url:
        return {"success": True, "phishing": False, "suspicious": False, "risk_score": 10}
    if "abuseipdb" in url:
        return {"data": {"abuseConfidenceScore": 0}}
    if "whois" in url:
        return {"creation_date": "2020-01-01T00:00:00Z"}
    return {}

def check_virustotal_url(url):
    """
    Checks a URL against the VirusTotal API to determine if it's malicious.
    
    The URL is SHA-256 hashed as required by the VirusTotal API v3 endpoint.
    VirusTotal aggregates results from multiple antivirus engines and URL scanners.
    
    Args:
        url: The URL to check
        
    Returns:
        Dictionary with VirusTotal scan results
    """
    api_url = f"https://www.virustotal.com/api/v3/urls/{hashlib.sha256(url.encode()).hexdigest()}"
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    return api_request(api_url, headers=headers)

def check_google_safe_browsing(url):
    """
    Checks a URL against Google's Safe Browsing API to see if it's on Google's blocklist.
    
    The Safe Browsing API maintains lists of URLs that contain malware, phishing,
    or other unwanted software that Google has detected on the web.
    
    Args:
        url: The URL to check
        
    Returns:
        Dictionary with matches if the URL is on any Google threat lists
    """
    api_url = "https://safebrowsing.googleapis.com/v4/threatMatches:find"
    payload = {'client': {'clientId': 'your-client-id', 'clientVersion': '1.5.2'}, 'threatInfo': {'threatTypes': ['MALWARE', 'SOCIAL_ENGINEERING'], 'platformTypes': ['ANY_PLATFORM'], 'threatEntries': [{'url': url}]}}
    params = {'key': GOOGLE_SAFE_BROWSING_API_KEY}
    return api_request(api_url, method='post', json_data=payload, params=params)

def check_ipqs(url):
    """
    Checks a URL against the IPQualityScore (IPQS) API for risk assessment.
    
    IPQS analyzes URLs for phishing, malware, and other fraudulent content, providing
    a risk score and classification for the URL.
    
    Args:
        url: The URL to check
        
    Returns:
        Dictionary with IPQS risk assessment data
    """
    api_url = f"https://www.ipqualityscore.com/api/json/url/{IPQS_API_KEY}/{url}"
    return api_request(api_url)

def check_abuseipdb(ip):
    """
    Checks an IP address against the AbuseIPDB API for reputation information.
    
    AbuseIPDB is a database of reported IP addresses that have been associated with
    malicious activity such as spam, attacks, or other abusive behavior.
    
    Args:
        ip: The IP address to check
        
    Returns:
        Dictionary with AbuseIPDB reputation data
    """
    api_url = "https://api.abuseipdb.com/api/v2/check"
    params = {'ipAddress': ip, 'maxAgeInDays': '90'}
    headers = {'Key': ABUSEIPDB_API_KEY, 'Accept': 'application/json'}
    return api_request(api_url, params=params, headers=headers)

def get_whois_info(domain):
    """
    Performs a WHOIS lookup on a domain to get registration information.
    
    This is important for phishing detection because newly registered domains
    (less than a few months old) are often associated with phishing campaigns.
    
    Args:
        domain: The domain to look up
        
    Returns:
        Dictionary with WHOIS data including creation date
    """
    # This is a placeholder for a real WHOIS lookup
    logger.info(f"Performing WHOIS lookup for {domain}")
    return {"creation_date": "2020-01-01T00:00:00Z"} # Simulated response

def check_virustotal_domain(domain):
    """
    Checks a domain against the VirusTotal API to determine if it's malicious.
    
    This function gets domain-specific reputation information that may include
    historical data, categorization, and verdicts from multiple security vendors.
    
    Args:
        domain: The domain to check
        
    Returns:
        Dictionary with VirusTotal domain reputation data
    """
    api_url = f"https://www.virustotal.com/api/v3/domains/{domain}"
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    return api_request(api_url, headers=headers)

def check_virustotal_ip(ip):
    """
    Checks an IP address against the VirusTotal API to determine if it's malicious.
    
    This function gets IP-specific reputation information including historical data,
    associated malicious URLs, and verdicts from multiple security vendors.
    
    Args:
        ip: The IP address to check
        
    Returns:
        Dictionary with VirusTotal IP reputation data
    """
    api_url = f"https://www.virustotal.com/api/v3/ip_addresses/{ip}"
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    return api_request(api_url, headers=headers)
# --- Helper Functions for Feature Extraction ---

def is_ip_address(domain_or_ip):
    """
    Checks if a string is a valid IP address.
    
    Phishing sites sometimes use direct IP addresses instead of domain names
    to avoid domain registration and DNS lookups.
    
    Args:
        domain_or_ip: String to check
        
    Returns:
        Boolean: True if it's a valid IP address, False otherwise
    """
    if not domain_or_ip: return False
    try:
        ipaddress.ip_address(domain_or_ip)
        return True
    except ValueError:
        return False

def has_suspicious_tld(domain):
    """
    Checks if a domain uses a top-level domain (TLD) that is commonly associated with phishing.
    
    Certain TLDs are frequently used for phishing due to their low cost, 
    ease of registration, or lack of strict registration requirements.
    
    Args:
        domain: Domain to check
        
    Returns:
        Boolean: True if the domain has a suspicious TLD, False otherwise
    """
    return domain.endswith(('.xyz', '.top', '.tk', '.link', '.zip', '.info', '.club', '.site', '.online', '.live', '.loan', '.work', '.ninja', '.accountants', '.download', '.security', '.gift', '.review', '.mov')) if '.' in domain else False

def is_shortened_url(domain):
    """
    Checks if a domain belongs to a known URL shortening service.
    
    URL shorteners are often used in phishing to hide the actual malicious URL
    and make it look more legitimate or less suspicious.
    
    Args:
        domain: Domain to check
        
    Returns:
        Boolean: True if it's a URL shortening service, False otherwise
    """
    return domain.lower() in ['bit.ly', 't.co', 'tinyurl.com', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'rb.gy', 'shorturl.at']

def uses_uncommon_port(parsed_url):
    """
    Checks if the URL uses a non-standard port.
    
    Phishing sites sometimes use uncommon ports to evade detection
    or to appear more technical and intimidating to users.
    
    Args:
        parsed_url: A parsed URL object from urlparse
        
    Returns:
        Boolean: True if the URL uses an uncommon port, False otherwise
    """
    return parsed_url.port not in [None, 80, 443, 8080, 8443]

def calculate_string_entropy(text):
    """
    Calculates the Shannon entropy (randomness) of a string.
    
    High entropy in a domain or path can indicate algorithmically generated names
    often used in malware or phishing domains.
    
    Args:
        text: String to analyze
        
    Returns:
        Float: Entropy value (higher means more random)
    """
    if not text: return 0.0
    text = str(text)
    freq = {}
    text_len = len(text)
    if text_len == 0: return 0.0
    for char in text:
        freq[char] = freq.get(char, 0) + 1
    entropy = 0.0
    for count in freq.values():
        if count > 0:
            probability = count / text_len
            entropy -= probability * math.log2(probability)
    return entropy

def contains_brand_name(domain):
    """
    Checks if a domain contains a well-known brand name.
    
    Phishing sites often include brand names to impersonate legitimate sites
    (e.g., "paypal-secure.com" or "google-login.xyz").
    
    Args:
        domain: Domain to check
        
    Returns:
        Boolean: True if the domain contains a brand name, False otherwise
    """
    return any(brand in domain.lower() for brand in ['paypal', 'google', 'microsoft', 'apple', 'amazon', 'facebook', 'netflix', 'bank'])

def check_typosquatting(domain):
    """
    Checks if a domain uses typosquatting techniques to mimic popular brands.
    
    Typosquatting uses character substitutions (e.g., "0" for "o", "1" for "l")
    to create domains that look similar to legitimate ones.
    
    Args:
        domain: Domain to check
        
    Returns:
        Boolean: True if the domain appears to use typosquatting, False otherwise
    """
    return 'g00gle' in domain.lower() or 'paypa1' in domain.lower() or 'micros0ft' in domain.lower() or 'app1e' in domain.lower()

def has_unusual_redirect_param(query_string):
    """
    Checks if the URL's query string contains redirect parameters.
    
    Phishing attacks often use redirect parameters to first load a legitimate-looking
    page and then redirect the user to a malicious site.
    
    Args:
        query_string: The query portion of the URL
        
    Returns:
        Boolean: True if redirect parameters are found, False otherwise
    """
    return any(f'{param}=' in query_string.lower() for param in ['url', 'redirect', 'goto', 'next', 'continue', 'return_to', 'dest', 'target'])


# --- Core URL Analysis Functions ---

def extract_url_features(url, parsed_url, domain_or_ip, is_ip):
    """
    Extracts a comprehensive set of features from a URL for phishing detection.
    
    This function analyzes various aspects of a URL, including its structure,
    length, special characters, entropy, and other attributes that might indicate
    phishing activity.
    
    Args:
        url: The full URL string
        parsed_url: A parsed URL object from urlparse
        domain_or_ip: The domain or IP extracted from the URL
        is_ip: Boolean indicating if the URL uses an IP address instead of a domain
        
    Returns:
        Dictionary of extracted features
    """
    logger.info("Extracting URL features")
    domain_part = domain_or_ip if not is_ip else None
    features = {
        "url": url, "domain_ip_for_rep_check": domain_or_ip, "is_ip_address": is_ip,
        "url_length": len(url), "domain_length": len(domain_or_ip),
        "path_length": len(parsed_url.path), "query_length": len(parsed_url.query),
        "fragment_length": len(parsed_url.fragment),
        "subdomain_count": domain_or_ip.count('.') if not is_ip else 0,
        "path_depth": len([p for p in parsed_url.path.split('/') if p]),
        "query_param_count": len(parse_qs(parsed_url.query)),
        "domain_dash_count": domain_or_ip.count('-'),
        "path_dash_count": parsed_url.path.count('-'),
        "query_underscore_count": parsed_url.query.count('_'),
        "path_dot_count": parsed_url.path.count('.'),
        "domain_digit_count": sum(c.isdigit() for c in domain_or_ip),
        "path_digit_count": sum(c.isdigit() for c in parsed_url.path),
        "has_at_sign": '@' in parsed_url.netloc.lower(),
        "has_double_slash_in_path": '//' in parsed_url.path.lstrip('/'),
        "has_hex_chars": bool(re.search(r'%[0-9a-fA-F]{2}', url)),
        "has_suspicious_tld": has_suspicious_tld(domain_or_ip) if not is_ip else False,
        "has_suspicious_keywords": any(re.search(r'\b' + re.escape(kw) + r'\b|' + re.escape(kw), url.lower()) for kw in PHISHING_KEYWORDS),
        "is_shortened_url": is_shortened_url(domain_or_ip) if not is_ip else False,
        "uses_https": parsed_url.scheme == 'https',
        "uses_non_std_port": uses_uncommon_port(parsed_url),
        "domain_entropy": calculate_string_entropy(domain_part.split('.')[-2]) if domain_part and '.' in domain_part and len(domain_part.split('.')) > 1 else 0.0,
        "path_entropy": calculate_string_entropy(parsed_url.path),
        "query_entropy": calculate_string_entropy(parsed_url.query),
        "contains_brand_name": contains_brand_name(domain_or_ip) if not is_ip else False,
        "is_potential_typosquatting": check_typosquatting(domain_or_ip) if not is_ip else False,
        "has_redirect_param": has_unusual_redirect_param(parsed_url.query)
    }
    return features

def calculate_url_phishing_score(features, api_results):
    """
    Calculates a phishing risk score for a URL based on extracted features and API results.
    
    This function is the core of the phishing detection system. It combines local features
    (URL structure, length, entropy, etc.) with external intelligence from security APIs
    to assign a risk score and identify specific reasons for that score.
    
    Args:
        features: Dictionary of URL features from extract_url_features
        api_results: Dictionary of results from security API checks
        
    Returns:
        Tuple of (score, reasons) where score is a float 0-10 and reasons is a list of strings
    """
    logger.info("Calculating URL phishing score")
    score = 0.0
    reasons = []
    
    feature_weights = {
        "is_ip_address": 1.5, "url_length_thresh": (80, 0.025),
        "subdomain_count_thresh": (3, 0.5), "has_at_sign": 1.2,
        "has_suspicious_tld": 1.5, "has_suspicious_keywords": 1.8,
        "is_shortened_url": 1.0, "uses_https": -1.2,
        "contains_brand_name": 2.0, "is_potential_typosquatting": 1.8,
    }
    for feature_key, feature_value in features.items():
        if feature_key in feature_weights:
            weight_config = feature_weights[feature_key]
            if isinstance(weight_config, tuple):
                threshold, weight = weight_config
                if feature_value > threshold:
                    score += (feature_value - threshold) * weight
                    reasons.append(f"Feature '{feature_key}' exceeded threshold")
            elif isinstance(weight_config, (int, float)):
                if feature_value:
                    score += weight_config
                    reasons.append(f"Feature '{feature_key}' is true")

    # API Scoring
    vt_url = api_results.get('virustotal_url', {})
    if isinstance(vt_url, dict) and 'error' not in vt_url:
        mal = vt_url.get('data', {}).get('attributes', {}).get('last_analysis_stats', {}).get('malicious', 0)
        susp = vt_url.get('data', {}).get('attributes', {}).get('last_analysis_stats', {}).get('suspicious', 0)
        if mal > 0:
            score += 2.5
            reasons.append(f"VT URL Malicious ({mal})")
        elif susp > 0:
            score += 1.2
            reasons.append(f"VT URL Suspicious ({susp})")

    gsb = api_results.get('google_safe_browsing', {})
    if isinstance(gsb, dict) and gsb.get('matches'):
        score += 2.8
        reasons.append("GSB Hit")

    ipqs = api_results.get('ipqs', {})
    if isinstance(ipqs, dict) and 'error' not in ipqs:
        if ipqs.get('phishing'):
            score += 2.2
            reasons.append("IPQS Phishing")
        elif ipqs.get('suspicious'):
            score += 1.0
            reasons.append("IPQS Suspicious")
        if ipqs.get('risk_score', 0) > 85:
            score += 1.5
            reasons.append(f"IPQS Risk > 85 ({ipqs.get('risk_score')})")

    final_score = max(0.0, min(score, 10.0))
    return final_score, reasons

def get_url_verdict(score):
    """
    Converts a numerical phishing score to a human-readable verdict.
    
    This function classifies URLs into different risk categories based on their score.
    
    Args:
        score: Numerical score from calculate_url_phishing_score (0-10)
        
    Returns:
        String verdict: "Legitimate", "Potentially Suspicious", "Suspicious", or "Phishing"
    """
    if score <= 0.8: return "Legitimate"
    elif score <= 2.0: return "Potentially Suspicious"
    elif score <= 4.5: return "Suspicious"
    else: return "Phishing"

def analyze_url(url, analyzed_domains_cache=None):
    """
    Main function to analyze a URL for phishing indicators.
    
    This is the primary entry point for URL scanning. It coordinates the entire process:
    1. URL parsing and validation
    2. Whitelist checking
    3. Feature extraction
    4. API reputation checks (run in parallel for efficiency)
    5. Scoring and verdict determination
    
    Args:
        url: The URL to analyze
        analyzed_domains_cache: Optional dictionary to cache results for domains already analyzed
        
    Returns:
        Dictionary with complete analysis results including verdict, score, and reasons
    """
    logger.info(f"Analyzing URL: {url}")
    if analyzed_domains_cache is None:
        analyzed_domains_cache = {}
    start_time = time.time()

    try:
        original_url = url
        if not re.match(r'^[a-zA-Z]+://', url):
            url = 'http://' + url
        parsed_url = urlparse(url)
        if not parsed_url.scheme in ['http', 'https'] or not parsed_url.netloc:
            raise ValueError("Invalid URL scheme or network location")
        domain_ip_raw = parsed_url.netloc.lower()
        domain_or_ip = domain_ip_raw.split(':', 1)[0] if ':' in domain_ip_raw else domain_ip_raw
        is_ip = is_ip_address(domain_or_ip)
        domain_regex = r'^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$'
        if not is_ip and not re.match(domain_regex, domain_or_ip):
            raise ValueError("Invalid domain name format")
    except Exception as e:
        logger.warning(f"Invalid URL format skipped: {original_url} - {e}")
        return {"url": original_url, "error": f"Invalid URL format: {e}", "score": 0, "verdict": "Error"}

    is_whitelisted_url = any(wl_domain and (domain_or_ip == wl_domain or domain_or_ip.endswith('.' + wl_domain)) for wl_domain in WHITELISTED_URLS)
    if is_whitelisted_url:
        logger.info(f"URL whitelisted: {url}")
        return {"url": url, "domain": domain_or_ip, "features": {}, "api_results": {}, "verdict": "Legitimate (Whitelisted)", "score": 0, "reasons": ["URL Whitelisted"]}

    features = extract_url_features(url, parsed_url, domain_or_ip, is_ip)

    api_results = {}
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {}
        if VIRUSTOTAL_API_KEY:
            futures['virustotal_url'] = executor.submit(check_virustotal_url, url)
        if GOOGLE_SAFE_BROWSING_API_KEY:
            futures['google_safe_browsing'] = executor.submit(check_google_safe_browsing, url)
        if IPQS_API_KEY:
            futures['ipqs'] = executor.submit(check_ipqs, url)

        if is_ip:
            if ABUSEIPDB_API_KEY:
                futures['abuseipdb'] = executor.submit(check_abuseipdb, domain_or_ip)
            if VIRUSTOTAL_API_KEY:
                futures['virustotal_ip'] = executor.submit(check_virustotal_ip, domain_or_ip)
        else:
            futures['whois'] = executor.submit(get_whois_info, domain_or_ip)
            if VIRUSTOTAL_API_KEY:
                futures['virustotal_domain'] = executor.submit(check_virustotal_domain, domain_or_ip)

        for key, future in futures.items():
            try:
                api_results[key] = future.result()
            except Exception as e:
                logger.error(f"API call {key} failed: {e}")
                api_results[key] = {"error": str(e)}

    score, reasons = calculate_url_phishing_score(features, api_results)
    verdict = get_url_verdict(score)

    analysis_result = {
        "url": url, "domain": domain_or_ip, "features": features,
        "api_results": api_results, "verdict": verdict,
        "score": round(score, 2), "reasons": reasons
    }
    logger.info(f"URL analysis completed for {url} in {time.time() - start_time:.2f} seconds. Score: {analysis_result['score']:.2f}, Verdict: {analysis_result['verdict']}")
    return analysis_result

if __name__ == '__main__':
    """
    This block is executed when the script is run directly (not imported as a module).
    It provides a simple example of how to use the analyze_url function.
    """
    # Example usage:
    test_url = "http://example.com"
    # test_url = "http://google.com"
    # test_url = "http://paypal.com.secure-login.xyz/login"
    result = analyze_url(test_url)
    import json
    print(json.dumps(result, indent=2))
