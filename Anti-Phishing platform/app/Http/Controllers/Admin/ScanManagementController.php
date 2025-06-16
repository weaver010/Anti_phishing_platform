<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UrlScan;
use App\Models\MalwareScan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ScanManagementController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', \App\Http\Middleware\AdminAccessMiddleware::class]);
    }

    public function urlScans(): Response
    {
        $scans = UrlScan::with('user')
            ->latest()
            ->paginate(10);

        $stats = [
            'total' => UrlScan::count(),
            'malicious' => UrlScan::where('is_malicious', true)->count(),
            'suspicious' => UrlScan::where('is_suspicious', true)->count(),
            'safe' => UrlScan::where('is_malicious', false)
                ->where('is_suspicious', false)
                ->count(),
        ];

        return Inertia::render('Admin/Scans/UrlScans', [
            'scans' => $scans,
            'stats' => $stats,
        ]);
    }

    public function malwareScans(): Response
    {
        $scans = MalwareScan::with('user')
            ->latest()
            ->paginate(10);

        $stats = [
            'total' => MalwareScan::count(),
            'malicious' => MalwareScan::where('is_malicious', true)->count(),
            'suspicious' => MalwareScan::where('is_suspicious', true)->count(),
            'safe' => MalwareScan::where('is_malicious', false)
                ->where('is_suspicious', false)
                ->count(),
        ];

        return Inertia::render('Admin/Scans/MalwareScans', [
            'scans' => $scans,
            'stats' => $stats,
        ]);
    }

    public function showUrlScan(UrlScan $scan): Response
    {
        $scan->load('user');
        
        return Inertia::render('Admin/Scans/ShowUrlScan', [
            'scan' => $scan,
        ]);
    }

    public function showMalwareScan(MalwareScan $scan): Response
    {
        $scan->load('user');
        
        return Inertia::render('Admin/Scans/ShowMalwareScan', [
            'scan' => $scan,
        ]);
    }

    public function deleteUrlScan(UrlScan $scan)
    {
        $scan->delete();

        return redirect()->route('admin.scans.urls')
            ->with('success', 'URL scan deleted successfully.');
    }

    public function deleteMalwareScan(MalwareScan $scan)
    {
        $scan->delete();

        return redirect()->route('admin.scans.malware')
            ->with('success', 'Malware scan deleted successfully.');
    }
} 