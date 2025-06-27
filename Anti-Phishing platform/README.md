# Anti-Phishing Platform

A comprehensive cybersecurity platform focused on detecting and preventing phishing threats through URL scanning, malware detection, and security awareness training.

## About the Project

Anti-Phishing Platform is a Laravel 11 application that helps users identify potential security threats through multiple scanning tools powered by VirusTotal's API. The platform offers real-time scanning of suspicious URLs and files, providing detailed analysis and risk assessments.

## Key Features

### URL Scanner
- **Real-time Threat Intelligence**: Scan any URL against VirusTotal's database of 70+ security vendors
- **Instant Risk Assessment**: Clearly categorized results (Safe, Suspicious, or Malicious) with detection statistics
- **Performance Optimized**: Redis-backed caching system for previously scanned URLs, delivering sub-second response times
- **PDF Report Generation**: One-click generation of professional PDF reports for documentation and sharing

### Malware Detection
- **Dual Scanning Methods**:
  - File Upload: Directly scan files (up to 32MB) against multiple antivirus engines
  - Hash Lookup: Ultra-fast SHA-256 hash verification without uploading sensitive files
- **Efficient Background Processing**: Queue-based architecture using Redis for resource-intensive operations
- **Detailed Analysis**: Comprehensive breakdown of detection statistics from multiple security vendors
- **Intelligent Caching**: Previously scanned files/hashes stored in Redis for instant retrieval

### Security Awareness Training
- Educational resources on recognizing phishing attempts
- Interactive simulations of common phishing scenarios
- Training content for strengthening security practices

### Additional Features
- User authentication and profile management
- Background job processing for handling resource-intensive scans
- Rate limiting to prevent API abuse
- Responsive UI designed with modern aesthetics

## Technical Architecture
- **Backend**: Laravel 11 framework
- **Database**: MySQL (development) / PostgreSQL (production)
- **Caching**: Redis for optimal performance
- **Queue System**: Laravel Queue with Redis driver
- **Frontend**: Modern responsive design
- **API Integration**: VirusTotal

## Prerequisites

Make sure you have the following installed on your system:

- PHP 8.3+
- Composer
- MySQL (for development) / PostgreSQL (for production)
- Redis (for caching)
- Node.js & npm (for frontend dependencies if needed)
- Laravel 11

## Installation Guide

### 1. Clone the Repository

```
git clone https://github.com/weaver010/Anti_phishing_platform.git
cd Anti_phishing_platform
```

### 2. Install Dependencies

```
composer install
```

If you encounter any errors, try updating Composer:

```
composer self-update
composer update
```

### 3. Set Up Environment Variables

Copy the example environment file and modify it accordingly:

```
cp .env.example .env
```

Edit `.env` and set up your database, mail, and API keys.

### 4. Generate Application Key

```
php artisan key:generate
```

### 5. Set Up Database

Make sure your database is running, then run:

```
php artisan migrate --seed
```

If migration fails, try:

```
php artisan migrate:fresh --seed
```

### 6. Configure Cache & Queue (Optional)

```
php artisan cache:clear
php artisan config:cache
php artisan queue:work
```

If you face queue issues, ensure the worker is running:

```
php artisan queue:restart
```

For processing specific queues (recommended for production):

```
php artisan queue:work --queue=file-scanning,url-scanning
```

### 7. Start the Application

```
php artisan serve
```

Your backend should now be running at http://127.0.0.1:8000

## API Testing

Verify your VirusTotal API connection:
```
GET /malware-api-test
```

## License

This project is licensed under the MIT License.

## Acknowledgements

- [VirusTotal](https://www.virustotal.com) for their comprehensive threat intelligence API
- [Laravel](https://laravel.com) framework