<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UrlScan;
use App\Models\MalwareScan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', \App\Http\Middleware\AdminAccessMiddleware::class]);
    }

    public function dashboard()
    {
        // Get total counts
        $totalUsers = User::count();
        $totalUrlScans = UrlScan::count();
        $totalMalwareScans = MalwareScan::count();
        
        // Get malicious counts
        $maliciousUrlScans = UrlScan::where('is_malicious', true)->count();
        $maliciousMalwareScans = MalwareScan::where('is_malicious', true)->count();
        
        // Get recent scans
        $recentUrlScans = UrlScan::with('user')
            ->latest()
            ->take(5)
            ->get();
            
        $recentMalwareScans = MalwareScan::with('user')
            ->latest()
            ->take(5)
            ->get();
            
        // Get scan trends for the last 7 days
        $scanTrends = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $scanTrends->push([
                'date' => $date->format('M d'),
                'url_scans' => UrlScan::whereDate('created_at', $date)->count(),
                'malware_scans' => MalwareScan::whereDate('created_at', $date)->count(),
            ]);
        }

        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => $totalUsers,
            'totalUrlScans' => $totalUrlScans,
            'totalMalwareScans' => $totalMalwareScans,
            'maliciousUrlScans' => $maliciousUrlScans,
            'maliciousMalwareScans' => $maliciousMalwareScans,
            'recentUrlScans' => $recentUrlScans,
            'recentMalwareScans' => $recentMalwareScans,
            'scanTrends' => $scanTrends,
        ]);
    }
} 