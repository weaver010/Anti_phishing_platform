# Anti-Phishing Application: URL & File Scanning Features
## Graduation Project Presentation Content

---

## 1. Introduction

### Project Overview
- **Anti-Phishing Web Application**: A security tool designed to protect users from malicious URLs and files
- **Target Problem**: Phishing attacks and malware distribution remain major security threats
- **Solution**: Provide an accessible way for users to verify URLs and files before interacting with them

### Key Features Presented Today
- **URL Scanning System**: Detect phishing websites and malicious links
- **File Scanning System**: Identify potential malware and viruses in user-uploaded files

---

## 2. Technology Stack

### Backend Architecture
- **Framework**: Laravel PHP framework for robust backend functionality
- **Security Integration**: VirusTotal API for comprehensive threat analysis
- **Queuing System**: Laravel's job queue for handling resource-intensive scans asynchronously
- **Caching Mechanism**: Efficient storage and retrieval of scan results

---

## 3. URL Scanning Feature

### 3.1 How It Works (User Perspective)
- User enters a suspicious URL
- System checks if URL has been scanned recently (cache)
- If not in cache, system submits URL to VirusTotal for analysis
- Results are displayed with threat level and detailed information
- Results are stored for future reference

### 3.2 Technical Implementation

#### ScanUrlJob Class
```php
class ScanUrlJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;
    protected $userId;
    protected $jobId;
    
    public $tries = 3;     // Retry mechanism for resilience
    public $timeout = 60;  // Prevent hanging jobs
    
    // Constructor and queue configuration
    public function __construct(string $url, $userId, string $jobId)
    {
        $this->url = $url;
        $this->userId = $userId;
        $this->jobId = $jobId;
        $this->onQueue('url-scanning'); // Dedicated queue
    }
    
    // Main job execution method
    public function handle(VirusTotalService $virusTotalService)
    {
        // Check cache first for efficiency
        $cachedResults = $virusTotalService->getCachedResults($cacheKey);
        if ($cachedResults) {
            // Return cached results immediately
            return;
        }
        
        // Submit URL for scanning
        $submitResponse = $virusTotalService->submitUrl($this->url);
        $analysisId = $submitResponse['data']['id'] ?? null;
        
        // Get analysis results
        $results = $virusTotalService->getAnalysis($analysisId);
        
        // Process results and update status
        $processedResults = $virusTotalService->processResults($results, [
            'url' => $this->url,
            'scan_id' => $analysisId,
            'job_id' => $this->jobId,
            'user_id' => $this->userId
        ]);
    }
}
```

#### Real-Time Progress Tracking
- Status updates stored in cache with unique job ID
- Progress percentage (0-100%) updated at each stage
- Detailed status messages provide transparency to users
- Results include threat level classification (safe, suspicious, malicious)

---

## 4. File Scanning Feature

### 4.1 How It Works (User Perspective)
- User uploads a suspicious file
- System calculates file hash (SHA-256)
- Two scanning modes:
  - **Hash-Only**: Check if file is known in VirusTotal database
  - **Full Upload**: Upload and scan file for comprehensive analysis
- Results show detailed malware detection data from multiple security engines

### 4.2 Technical Implementation

#### ScanFileJob Class
```php
class ScanFileJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;       // Absolute file path
    protected $fileName;       // Original file name
    protected $fileHash;       // File hash
    protected $fileSize;       // File size
    protected $userId;         // User ID
    protected $jobId;          // Job ID
    protected $deleteAfterScan; // Security measure
    protected $scanMode;       // 'file' or 'hash_only'
    
    public $timeout = 300; // 5 minutes for large files
    
    // Constructor with extensive parameter list for flexibility
    public function __construct(
        ?string $filePath,
        string $fileName, 
        string $fileHash, 
        int $fileSize, 
        $userId, 
        string $jobId,
        bool $deleteAfterScan = true,
        string $scanMode = 'file'
    ) {
        // Initialize properties
        $this->onQueue('file-scanning'); // Dedicated queue
    }
    
    public function handle(VirusTotalService $virusTotal)
    {
        // Check cache first
        $cachedResults = $virusTotal->getCachedResults($cacheKey);
        if ($cachedResults) {
            // Return cached results
            return;
        }
        
        // Process based on scan mode
        if ($this->scanMode === 'hash_only') {
            $this->processHashOnly($virusTotal, $statusKey, $cacheKey);
        } else {
            $this->processFile($virusTotal, $statusKey, $cacheKey);
        }
    }
}
```

#### Hash-Only Scanning Process
```php
protected function processHashOnly(VirusTotalService $virusTotal, string $statusKey, string $cacheKey) 
{
    // Update status
    Cache::put($statusKey, [
        'status' => 'processing',
        'progress' => 30,
        'message' => 'Checking file hash with VirusTotal',
        'fileName' => $this->fileName,
        'fileSize' => $this->fileSize
    ], 3600);
    
    // Get file report by hash
    $results = $virusTotal->getFileReportByHash($this->fileHash);
    
    // Check if hash was found and process results
    if (isset($results['data']) && isset($results['data']['attributes']['last_analysis_results'])) {
        // Process and cache results
        $processedResults = $virusTotal->processResults($results, [
            'fileName' => $this->fileName,
            'fileHash' => $this->fileHash,
            // Additional metadata
        ]);
        
        // Cache and return results
    }
}
```

#### Full File Scanning Process
```php
protected function processFile(VirusTotalService $virusTotal, string $statusKey, string $cacheKey) 
{
    // Verify file exists and is valid
    
    // Get upload URL from VirusTotal
    $uploadUrl = $virusTotal->getFileUploadUrl();
    
    // Upload file
    $uploadResponse = $virusTotal->uploadFile($uploadUrl, $this->filePath, $this->fileName);
    
    // Clean up file immediately after upload
    $this->cleanupFile();
    
    // Get analysis ID
    $analysisId = $uploadResponse['data']['id'] ?? null;
    
    // Wait for analysis to begin
    sleep(5);
    
    // Get analysis results
    $results = $virusTotal->getAnalysis($analysisId);
    
    // Process and store results
    $processedResults = $virusTotal->processResults($results, [
        'fileName' => $this->fileName,
        'fileSize' => $this->fileSize,
        'fileHash' => $this->fileHash,
        // Additional metadata
    ]);
}
```

#### Security Considerations
- Files deleted after scanning (security and storage efficiency)
- Verification of file integrity before processing
- Job cancellation checks throughout the process
- Extensive error handling and logging

---

## 5. Core Service: VirusTotalService

### Service Architecture
```php
class VirusTotalService
{
    protected $apiKey;
    protected $cacheTtl;

    public function __construct()
    {
        $this->apiKey = env('VIRUS_TOTAL_API_KEY');
        $this->cacheTtl = env('VIRUS_TOTAL_CACHE_TTL', 3600);
    }
    
    // URL-related methods
    public function submitUrl(string $url) { /* ... */ }
    
    // File-related methods
    public function getFileUploadUrl() { /* ... */ }
    public function uploadFile(string $uploadUrl, string $filePath, string $fileName) { /* ... */ }
    public function getFileReportByHash(string $hash) { /* ... */ }
    
    // Common methods
    public function getAnalysis(string $analysisId) { /* ... */ }
    public function processResults(array $results, array $meta = []) { /* ... */ }
    
    // Cache management
    public function cacheResults(string $key, array $data) { /* ... */ }
    public function getCachedResults(string $key) { /* ... */ }
    
    // API health check
    public function testApiConnection() { /* ... */ }
}
```

### Result Processing Logic
```php
public function processResults(array $results, array $meta = [])
{
    // Extract analysis data
    $attributes = $results['data']['attributes'] ?? [];
    $stats = $attributes['stats'] ?? [];
    
    // Calculate threat level
    $maliciousCount = $stats['malicious'] ?? 0;
    $suspiciousCount = $stats['suspicious'] ?? 0;
    
    $threatLevel = 'safe';
    if ($maliciousCount > 0) {
        $threatLevel = 'malicious';
    } elseif ($suspiciousCount > 0) {
        $threatLevel = 'suspicious';
    }
    
    // Format the response with detailed threat information
    $processedResults = [
        'threat_level' => $threatLevel,
        'is_malicious' => $threatLevel === 'malicious',
        'is_suspicious' => $threatLevel === 'suspicious',
        'stats' => [
            'total_engines' => array_sum($stats),
            'malicious' => $maliciousCount,
            'suspicious' => $suspiciousCount,
            // Additional stats
        ],
        'engine_results' => $engineResults,
        // Additional data
    ];
    
    return $processedResults;
}
```

---

## 6. Performance & Efficiency Features

### 6.1 Caching System
- All scan results cached with configurable TTL (Time-To-Live)
- Significantly reduces redundant API calls
- Improves user experience with instant results for previously scanned items
- Cache keys based on URL or file hash for efficient lookups

### 6.2 Queue-Based Architecture
- Resource-intensive scans processed asynchronously
- Dedicated queues for URL scanning and file scanning
- Prevents web server blocking during long operations
- Improves application scalability

### 6.3 Progressive Status Updates
- Real-time progress tracking using cache storage
- Detailed status messages at each stage of the scanning process
- Improves user experience during longer scans
- Allows for scan cancellation by users

---

## 7. Data Models

### URL Scan Model
```php
class UrlScan extends Model
{
    protected $fillable = [
        'url',
        'user_id',
        'is_malicious',
        'scan_results',
        'scanned_at',
    ];

    protected $casts = [
        'is_malicious' => 'boolean',
        'scan_results' => 'array',
        'scanned_at' => 'datetime',
    ];
}
```

### Malware Scan Model
```php
class MalwareScan extends Model
{
    protected $fillable = [
        'filename',
        'file_hash',
        'user_id',
        'is_malicious',
        'scan_results',
        'scanned_at',
    ];

    protected $casts = [
        'is_malicious' => 'boolean',
        'scan_results' => 'array',
        'scanned_at' => 'datetime',
    ];
}
```

---

## 8. Challenges & Solutions

### 8.1 API Rate Limiting
- **Challenge**: VirusTotal API has strict rate limits
- **Solution**: Implemented robust caching and intelligent retry mechanisms

### 8.2 Large File Handling
- **Challenge**: Uploading and processing large files efficiently
- **Solution**: Implemented hash-based scanning with fallback to full upload when needed

### 8.3 Asynchronous Status Updates
- **Challenge**: Keeping users informed about long-running scans
- **Solution**: Cache-based progress tracking with detailed status messages

### 8.4 Error Resilience
- **Challenge**: Handling API failures and interrupted scans
- **Solution**: Comprehensive error handling, logging, and retry mechanisms

---

## 9. Demo Scenarios

### 9.1 URL Scanning Demo
- Scan a known safe URL (e.g., https://example.com)
- Scan a known malicious URL (from test dataset)
- Demonstrate cached result retrieval

### 9.2 File Scanning Demo
- Scan a harmless file using hash-only mode
- Scan a test malware sample (EICAR test file)
- Show detection engine results and threat assessment

---

## 10. Future Enhancements

### 10.1 Machine Learning Integration
- Local pre-screening of URLs before API submission
- Pattern recognition for emerging threats
- Reduction in API dependency

### 10.2 Extended Integrations
- Additional security API integrations (e.g., Google Safe Browsing)
- Email attachment scanning capabilities
- Browser extension for real-time URL checking

### 10.3 Advanced Analytics
- Threat intelligence dashboard
- Historical scanning trends
- User-specific threat reports

---

## 11. Conclusion

### Key Achievements
- Implemented robust security scanning system for URLs and files
- Created efficient architecture with queues and caching
- Developed comprehensive error handling and user feedback

### Business Value
- Protection against phishing and malware threats
- Reduced risk of security breaches
- Educational component for users about security threats

### Personal Learning Outcomes
- Working with third-party security APIs
- Implementing asynchronous processing in Laravel
- Designing effective caching strategies for performance
