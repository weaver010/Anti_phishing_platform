<?php

namespace App\Jobs;

use App\Services\VirusTotalService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ScanFileJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;       // Absolute file path (can be null for hash-only mode)
    protected $fileName;       // Original file name
    protected $fileHash;       // File hash
    protected $fileSize;       // File size
    protected $userId;         // User ID
    protected $jobId;          // Job ID
    protected $deleteAfterScan; // Whether to delete the file after scanning
    protected $scanMode;       // Scan mode ('file' or 'hash_only')
    
    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;
    
    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 300; // 5 minutes

    /**
     * Create a new job instance.
     *
     * @param string|null $filePath Absolute file path (or null for hash-only mode)
     * @param string $fileName Original file name
     * @param string $fileHash File hash
     * @param int $fileSize File size
     * @param mixed $userId User ID
     * @param string $jobId Job ID
     * @param bool $deleteAfterScan Whether to delete the file after scanning
     * @param string $scanMode Scan mode ('file' or 'hash_only')
     * @return void
     */
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
        $this->filePath = $filePath;
        $this->fileName = $fileName;
        $this->fileHash = $fileHash;
        $this->fileSize = $fileSize;
        $this->userId = $userId;
        $this->jobId = $jobId;
        $this->deleteAfterScan = $deleteAfterScan;
        $this->scanMode = $scanMode;
        
        // Set the queue this job should go to
        $this->onQueue('file-scanning');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(VirusTotalService $virusTotal)
    {
        $cacheKey = 'file-scan:' . $this->fileHash;
        $statusKey = 'scan-status:' . $this->jobId;
        
        try {
            // Initial status update
            Log::info('Starting scan job', [
                'jobId' => $this->jobId,
                'fileName' => $this->fileName,
                'fileHash' => $this->fileHash,
                'scanMode' => $this->scanMode
            ]);
            
            // Check if the job has been cancelled before we start
            if ($this->checkIfCancelled($statusKey)) {
                Log::info('File scanning job cancelled before processing started', [
                    'jobId' => $this->jobId,
                    'fileName' => $this->fileName
                ]);
                
                // Clean up the file if needed
                $this->cleanupFile();
                return;
            }
            
            // Update status to processing
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 10,
                'message' => 'Starting analysis',
                'fileName' => $this->fileName,
                'fileSize' => $this->fileSize
            ], 3600);
            
            // Check if we already have cached results
            $cachedResults = $virusTotal->getCachedResults($cacheKey);
            if ($cachedResults) {
                // Update status to completed with fromCache flag
                Cache::put($statusKey, [
                    'status' => 'completed',
                    'progress' => 100,
                    'message' => 'Analysis completed (from cache)',
                    'results' => $cachedResults,
                    'fileName' => $this->fileName,
                    'fileSize' => $this->fileSize,
                    'fromCache' => true
                ], 3600);
                
                // Clean up the file if needed
                $this->cleanupFile();
                return;
            }
            
            // Handle based on scan mode
            if ($this->scanMode === 'hash_only') {
                $this->processHashOnly($virusTotal, $statusKey, $cacheKey);
            } else {
                $this->processFile($virusTotal, $statusKey, $cacheKey);
            }
            
        } catch (\Exception $e) {
            Log::error('Malware scan job failed', [
                'jobId' => $this->jobId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Update status to failed
            Cache::put($statusKey, [
                'status' => 'failed',
                'progress' => 100,
                'message' => 'Scan failed: ' . $e->getMessage(),
                'fileName' => $this->fileName,
                'fileSize' => $this->fileSize
            ], 3600);
            
            // Clean up
            $this->cleanupFile();
            
            throw $e;
        }
    }
    
    /**
     * Process scan using only a hash (no file upload)
     */
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
        
        // Log the hash we're checking
        Log::info('Checking file hash with VirusTotal', [
            'hash' => $this->fileHash,
            'jobId' => $this->jobId
        ]);
        
        // Get file report by hash
        $results = $virusTotal->getFileReportByHash($this->fileHash);
        
        // Log the response structure
        Log::info('VirusTotal hash lookup response structure', [
            'has_data' => isset($results['data']),
            'has_hash_not_found' => isset($results['hash_not_found']),
            'has_error' => isset($results['error']),
            'response_keys' => array_keys($results),
            'hash' => $this->fileHash
        ]);
        
        // If the job was cancelled during API call
        if ($this->checkIfCancelled($statusKey)) {
            return;
        }
        
        // Check if hash was found in VirusTotal
        if (isset($results['data']) && isset($results['data']['attributes']['last_analysis_results'])) {
            // Process and cache results
            $processedResults = $virusTotal->processResults($results, [
                'fileName' => $this->fileName,
                'fileSize' => $this->fileSize,
                'fileHash' => $this->fileHash,
                'scan_id' => $this->fileHash,
                'job_id' => $this->jobId
            ]);
            
            $virusTotal->cacheResults($cacheKey, $processedResults);
            
            // Update status to completed
            Cache::put($statusKey, [
                'status' => 'completed',
                'progress' => 100,
                'message' => 'Analysis completed successfully',
                'results' => $processedResults,
                'fileName' => $this->fileName,
                'fileSize' => $this->fileSize,
                'fromCache' => false
            ], 3600);
            
            return;
        }
        
        // If we get an error response
        if (isset($results['error'])) {
            Log::error('Error in VirusTotal hash lookup', [
                'hash' => $this->fileHash,
                'error' => $results['error']
            ]);
            
            // Update status to error with appropriate message
            Cache::put($statusKey, [
                'status' => 'completed',
                'progress' => 100,
                'message' => 'Error checking hash: ' . $results['error'],
                'fileName' => $this->fileName,
                'fileSize' => $this->fileSize,
                'results' => [
                    'stats' => ['error' => 1, 'harmless' => 0, 'malicious' => 0, 'suspicious' => 0, 'undetected' => 0],
                    'status' => 'error',
                    'message' => 'Error checking hash: ' . $results['error'],
                    'scanned_at' => now()->toIso8601String(),
                    'meta' => [
                        'fileName' => $this->fileName,
                        'fileSize' => $this->fileSize,
                        'fileHash' => $this->fileHash,
                        'job_id' => $this->jobId
                    ],
                    'api_error' => true
                ]
            ], 3600);
            
            return;
        }
        
        // If hash not found, inform the user
        Cache::put($statusKey, [
            'status' => 'completed',
            'progress' => 100,
            'message' => 'Hash not found in VirusTotal database. Please upload the file for a complete scan.',
            'fileName' => $this->fileName,
            'fileSize' => $this->fileSize,
            'results' => [
                'stats' => ['not_found' => 1, 'harmless' => 0, 'malicious' => 0, 'suspicious' => 0, 'undetected' => 0],
                'status' => 'not_found',
                'message' => 'File hash not found in VirusTotal database',
                'scanned_at' => now()->toIso8601String(),
                'meta' => [
                    'fileName' => $this->fileName,
                    'fileSize' => $this->fileSize,
                    'fileHash' => $this->fileHash,
                    'job_id' => $this->jobId
                ]
            ]
        ], 3600);
    }
    
    /**
     * Process scan using a file upload
     */
    protected function processFile(VirusTotalService $virusTotal, string $statusKey, string $cacheKey) 
    {
        // Verify file exists with multiple attempts
        $fileExists = false;
        $attempts = 0;
        $maxAttempts = 3;
        
        while (!$fileExists && $attempts < $maxAttempts) {
            $attempts++;
            
            if (file_exists($this->filePath)) {
                $fileExists = true;
                Log::info("File found on attempt {$attempts}", [
                    'filePath' => $this->filePath
                ]);
                break;
            }
            
            Log::warning("File not found on attempt {$attempts}", [
                'filePath' => $this->filePath,
                'jobId' => $this->jobId
            ]);
            
            if ($attempts < $maxAttempts) {
                // Wait a bit before retrying
                sleep(2);
            }
        }
        
        if (!$fileExists) {
            Log::error('File not found after multiple attempts', [
                'filePath' => $this->filePath,
                'jobId' => $this->jobId,
                'attempts' => $attempts
            ]);
            
            throw new \Exception("File not found after {$attempts} attempts: {$this->filePath}");
        }
        
        // Get file size to verify it's not empty
        $fileSize = filesize($this->filePath);
        if ($fileSize <= 0) {
            Log::error('File is empty', [
                'filePath' => $this->filePath,
                'size' => $fileSize
            ]);
            
            throw new \Exception("File is empty: {$this->filePath}");
        }
        
        Log::info('File verified for processing', [
            'filePath' => $this->filePath,
            'jobId' => $this->jobId,
            'size' => $fileSize
        ]);
        
        // Check if the job has been cancelled
        if ($this->checkIfCancelled($statusKey)) {
            $this->cleanupFile();
            return;
        }
        
        // Update status
        Cache::put($statusKey, [
            'status' => 'processing',
            'progress' => 20,
            'message' => 'Getting upload URL',
            'fileName' => $this->fileName,
            'fileSize' => $this->fileSize
        ], 3600);
        
        // Get file upload URL
        $uploadUrl = $virusTotal->getFileUploadUrl();
        
        // Check if the job has been cancelled
        if ($this->checkIfCancelled($statusKey)) {
            $this->cleanupFile();
            return;
        }
        
        // Update status
        Cache::put($statusKey, [
            'status' => 'processing',
            'progress' => 30,
            'message' => 'Uploading file to VirusTotal',
            'fileName' => $this->fileName,
            'fileSize' => $this->fileSize
        ], 3600);
        
        // Upload file for scanning - using the absolute path directly
        $uploadResponse = $virusTotal->uploadFile($uploadUrl, $this->filePath, $this->fileName);
        
        // Clean up immediately after upload
        $this->cleanupFile();
        
        $analysisId = $uploadResponse['data']['id'] ?? null;
        
        if (!$analysisId) {
            throw new \Exception('Failed to get analysis ID');
        }
        
        // Check if the job has been cancelled
        if ($this->checkIfCancelled($statusKey)) {
            return;
        }
        
        // Update status
        Cache::put($statusKey, [
            'status' => 'processing',
            'progress' => 60,
            'message' => 'File uploaded, retrieving analysis',
            'fileName' => $this->fileName,
            'fileSize' => $this->fileSize
        ], 3600);
        
        // Wait a few seconds to allow analysis to begin
        sleep(5);
        
        // Get analysis results
        $results = $virusTotal->getAnalysis($analysisId);
        
        // Check if the job has been cancelled
        if ($this->checkIfCancelled($statusKey)) {
            return;
        }
        
        // Check if analysis is still in progress
        $status = $results['data']['attributes']['status'] ?? null;
        if ($status === 'queued') {
            // If still queued, retry with backoff
            $this->release(30);
            
            // Update status
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 70,
                'message' => 'Analysis in progress, waiting for results',
                'fileName' => $this->fileName,
                'fileSize' => $this->fileSize
            ], 3600);
            
            return;
        }
        
        // Process and cache results
        $processedResults = $virusTotal->processResults($results, [
            'fileName' => $this->fileName,
            'fileSize' => $this->fileSize,
            'fileHash' => $this->fileHash,
            'scan_id' => $analysisId,
            'job_id' => $this->jobId
        ]);
        
        $virusTotal->cacheResults($cacheKey, $processedResults);
        
        // Update status to completed
        Cache::put($statusKey, [
            'status' => 'completed',
            'progress' => 100,
            'message' => 'Analysis completed successfully',
            'results' => $processedResults,
            'fileName' => $this->fileName,
            'fileSize' => $this->fileSize,
            'fromCache' => false
        ], 3600);
    }
    
    /**
     * Clean up the file if deleteAfterScan is true
     */
    protected function cleanupFile()
    {
        if ($this->deleteAfterScan && $this->filePath && file_exists($this->filePath)) {
            try {
                unlink($this->filePath);
                Log::info('Deleted file from storage', [
                    'filePath' => $this->filePath
                ]);
            } catch (\Exception $e) {
                Log::warning('Failed to delete file from storage', [
                    'filePath' => $this->filePath,
                    'error' => $e->getMessage()
                ]);
            }
        }
    }
    
    /**
     * Check if the current job has been cancelled by the user
     * 
     * @param string $statusKey The cache key for the job status
     * @return bool Whether the job has been cancelled
     */
    protected function checkIfCancelled(string $statusKey): bool
    {
        if (Cache::has($statusKey)) {
            $status = Cache::get($statusKey);
            return ($status['status'] ?? '') === 'cancelled';
        }
        
        return false;
    }
} 