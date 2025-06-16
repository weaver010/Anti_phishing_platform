<?php

namespace App\Http\Controllers;

use App\Jobs\ScanUrlJob;
use App\Services\VirusTotalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class UrlScanController extends Controller
{
    protected $virusTotalService;
    
    public function __construct(VirusTotalService $virusTotalService)
    {
        $this->virusTotalService = $virusTotalService;
    }
    
    public function show()
    {
return Inertia::render('UrlCheck/UrlCheck');
    }
    
    public function scan(Request $request)
    {
        $request->validate([
            'url' => 'required|url'
        ]);
        
        $url = $request->input('url');
        $userId = $request->user() ? $request->user()->id : $request->ip();
        
        // Implement rate limiting - 20 requests per minute per user
        if (RateLimiter::tooManyAttempts('url-scan:'.$userId, 20)) {
            $seconds = RateLimiter::availableIn('url-scan:'.$userId);
            
            return response()->json([
                'success' => false,
                'message' => "Rate limit exceeded. Please try again after {$seconds} seconds.",
                'retry_after' => $seconds
            ], 429);
        }
        
        RateLimiter::hit('url-scan:'.$userId);
        
        // Generate a unique job ID
        $jobId = (string) Str::uuid();
        
        // Check cache first for immediate results
        $cacheKey = 'url-scan:' . md5($url);
        $cachedResults = $this->virusTotalService->getCachedResults($cacheKey);
        
        if ($cachedResults) {
            // Return immediately with cached results
            return response()->json([
                'success' => true,
                'jobId' => $jobId,
                'results' => $cachedResults,
                'fromCache' => true,
                'completed' => true,
                'details' => [
                    'url' => $url,
                    'cached_at' => $cachedResults['scanned_at'] ?? null,
                    'threat_level' => $cachedResults['threat_level'] ?? 'unknown'
                ]
            ]);
        }
        
        // Not in cache, dispatch job and return job ID
        try {
            // Create initial status
            Cache::put('scan-status:' . $jobId, [
                'status' => 'queued',
                'progress' => 0,
                'message' => 'Analysis queued, starting soon',
                'details' => [
                    'url' => $url,
                    'queued_at' => now()->toDateTimeString()
                ]
            ], 3600);
            
            // Dispatch job to background queue
            ScanUrlJob::dispatch($url, $userId, $jobId);
            
            return response()->json([
                'success' => true,
                'message' => 'URL analysis queued',
                'jobId' => $jobId,
                'completed' => false,
                'details' => [
                    'url' => $url,
                    'queued_at' => now()->toDateTimeString()
                ]
            ]);
            
        } catch (\Exception $e) {
            report($e);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to queue URL analysis',
                'error' => $e->getMessage(),
                'details' => [
                    'url' => $url,
                    'error' => $e->getMessage(),
                    'failed_at' => now()->toDateTimeString()
                ]
            ], 500);
        }
    }
    
    /**
     * Check the status of a scan job
     */
    public function checkStatus(Request $request)
    {
        $request->validate([
            'jobId' => 'required|string'
        ]);
        
        $jobId = $request->input('jobId');
        $statusKey = 'scan-status:' . $jobId;
        
        if (!Cache::has($statusKey)) {
            return response()->json([
                'success' => false,
                'message' => 'Job not found or expired',
                'details' => [
                    'job_id' => $jobId,
                    'error' => 'Job not found or expired'
                ]
            ], 404);
        }
        
        $status = Cache::get($statusKey);
        $completed = in_array($status['status'] ?? '', ['completed', 'failed']);
        
        // If completed, include the full results
        if ($completed && isset($status['results'])) {
            $status['results'] = $status['results'];
        }
        
        return response()->json([
            'success' => true,
            'completed' => $completed,
            'status' => $status,
            'details' => $status['details'] ?? []
        ]);
    }
    
    /**
     * Helper method to generate PDF report
     */
    public function generateReport(Request $request)
    {
        $request->validate([
            'url' => 'required|url'
        ]);
        
        $url = $request->input('url');
        $cacheKey = 'url-scan:' . md5($url);
        
        try {
            if (!Cache::has($cacheKey)) {
                return response()->json([
                    'success' => false,
                    'message' => 'No scan results found for this URL. Please scan the URL first.'
                ], 404);
            }
            
            $results = Cache::get($cacheKey);
            
            // Generate PDF report
            $scanDate = isset($results['scanned_at']) 
                ? date('F j, Y, g:i a', strtotime($results['scanned_at'])) 
                : date('F j, Y, g:i a');
                
            // Format stats for better display
            $stats = $results['stats'] ?? [
                'harmless' => 0,
                'malicious' => 0,
                'suspicious' => 0,
                'undetected' => 0
            ];
            
            // Calculate summary result
            $isMalicious = ($stats['malicious'] ?? 0) > 0;
            $isSuspicious = ($stats['suspicious'] ?? 0) > 0;
            $isSafe = !$isMalicious && !$isSuspicious;
            
            // Create status message based on scan results
            $statusMessage = $isMalicious 
                ? 'Potentially Dangerous!' 
                : ($isSuspicious ? 'Suspicious' : 'Safe');
            
            // Generate a unique filename for the report
            $fileName = 'url_scan_report_' . time() . '.pdf';
            
            // Generate PDF with the formatted data
            $pdf = PDF::loadView('reports.url-scan', [
                'url' => $url,
                'scanDate' => $scanDate,
                'stats' => $stats,
                'isMalicious' => $isMalicious,
                'isSuspicious' => $isSuspicious,
                'isSafe' => $isSafe,
                'statusMessage' => $statusMessage,
                'results' => $results,
            ]);
            
            // Generate and return the PDF for download
            return $pdf->download($fileName);
            
        } catch (\Exception $e) {
            \Log::error('PDF Generation Error', [
                'url' => $url,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate PDF report: ' . $e->getMessage()
            ], 500);
        }
    }
} 