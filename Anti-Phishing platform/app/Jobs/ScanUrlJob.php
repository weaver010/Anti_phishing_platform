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
use Illuminate\Support\Facades\Event;

class ScanUrlJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;
    protected $userId;
    protected $jobId;
    
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
    public $timeout = 30;

    /**
     * Create a new job instance.
     *
     * @param string $url
     * @param string|int $userId
     * @param string $jobId
     * @return void
     */
    public function __construct(string $url, $userId, string $jobId)
    {
        $this->url = $url;
        $this->userId = $userId;
        $this->jobId = $jobId;
        
        // Set the queue this job should go to
        $this->onQueue('url-scanning');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(VirusTotalService $virusTotalService)
    {
        $cacheKey = 'url-scan:' . md5($this->url);
        $statusKey = 'scan-status:' . $this->jobId;
        
        try {
            // Update status to processing
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 10,
                'message' => 'Starting URL analysis',
                'details' => [
                    'url' => $this->url,
                    'started_at' => now()->toDateTimeString()
                ]
            ], 3600);
            
            // Check if we already have cached results
            $cachedResults = $virusTotalService->getCachedResults($cacheKey);
            if ($cachedResults) {
                // Update status to completed with fromCache flag
                Cache::put($statusKey, [
                    'status' => 'completed',
                    'progress' => 100,
                    'message' => 'Analysis completed (from cache)',
                    'results' => $cachedResults,
                    'fromCache' => true,
                    'details' => [
                        'url' => $this->url,
                        'completed_at' => now()->toDateTimeString(),
                        'cached_at' => $cachedResults['scanned_at'] ?? null
                    ]
                ], 3600);
                
                return;
            }
            
            // Update status
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 20,
                'message' => 'Submitting URL to VirusTotal',
                'details' => [
                    'url' => $this->url,
                    'stage' => 'submission'
                ]
            ], 3600);
            
            // Submit URL for scanning
            $submitResponse = $virusTotalService->submitUrl($this->url);
            
            // Extract analysis ID from the response
            $analysisId = $submitResponse['data']['id'] ?? null;
            if (!$analysisId) {
                throw new \Exception('Could not get analysis ID from VirusTotal response');
            }

            // Update status
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 50,
                'message' => 'URL submitted, awaiting analysis results',
                'details' => ['analysis_id' => $analysisId]
            ], 3600);

            // Wait for analysis to complete
            $analysisResult = $virusTotalService->waitForAnalysisCompletion($analysisId);

            // Process and cache the final results
            $processedResults = $virusTotalService->processResults($analysisResult, ['url' => $this->url]);
            $virusTotalService->cacheResults($cacheKey, $processedResults);

            // Final status update
            Cache::put($statusKey, [
                'status' => 'completed',
                'progress' => 100,
                'message' => 'Analysis complete',
                'results' => $processedResults,
                'fromCache' => false
            ], 3600);

        } catch (\Exception $e) {
            Log::error('URL scan job failed', [
                'jobId' => $this->jobId, 
                'url' => $this->url, 
                'error' => $e->getMessage()
            ]);

            Cache::put($statusKey, [
                'status' => 'failed',
                'message' => 'An error occurred during analysis',
                'error' => $e->getMessage()
            ], 3600);

            $this->fail($e);
        }
    }
}