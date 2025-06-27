<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SecurityNewsController extends Controller
{
    public function getSecurityNews()
    {
        // Placeholder for security news functionality
        return response()->json([
            'articles' => [
                [
                    'title' => 'Latest Security Threats',
                    'description' => 'Stay updated with the latest cybersecurity threats and how to protect against them.',
                    'url' => '#',
                    'publishedAt' => now()->toISOString()
                ]
            ]
        ]);
    }
} 