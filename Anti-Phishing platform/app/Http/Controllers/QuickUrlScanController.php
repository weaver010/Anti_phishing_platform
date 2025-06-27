<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RandomForestUrlService;

class QuickUrlScanController extends Controller
{
    public function scan(Request $request, RandomForestUrlService $rfService)
    {
        $request->validate([
            'url' => 'required|url'
        ]);

        $result = $rfService->predict($request->input('url'));

        if ($result['is_phishing'] === null) {
            return response()->json(['error' => 'Prediction failed.'], 500);
        }

        return response()->json($result);
    }
}