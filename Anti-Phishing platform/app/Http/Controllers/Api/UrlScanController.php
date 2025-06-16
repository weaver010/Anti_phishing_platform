<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UrlScan;
use App\Services\VirusTotalService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UrlScanController extends Controller
{
    protected $virusTotalService;
    
    public function __construct(VirusTotalService $virusTotalService)
    {
        $this->virusTotalService = $virusTotalService;
    }
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $scans = UrlScan::where('user_id', $user->id)
            ->latest()
            ->paginate(10);
            
        return response()->json($scans);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
            'scan_results' => 'sometimes|array',
            'is_malicious' => 'sometimes|boolean',
            'is_suspicious' => 'sometimes|boolean',
        ]);
        
        $user = $request->user();
        
        $scan = new UrlScan();
        $scan->url = $request->url;
        $scan->user_id = $user->id;
        $scan->is_malicious = $request->is_malicious ?? false;
        $scan->is_suspicious = $request->is_suspicious ?? false;
        
        if ($request->has('scan_results')) {
            $scan->scan_results = $request->scan_results;
            $scan->scanned_at = now();
        }
        
        $scan->save();
        
        return response()->json([
            'success' => true,
            'message' => 'URL scan created successfully',
            'scan' => $scan
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(UrlScan $scan)
    {
        // Check if the authenticated user owns this scan
        if ($scan->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to scan'
            ], 403);
        }
        
        return response()->json([
            'success' => true,
            'scan' => $scan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UrlScan $scan)
    {
        // Check if the authenticated user owns this scan
        if ($scan->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access to scan'
            ], 403);
        }
        
        $scan->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Scan deleted successfully'
        ]);
    }
}
