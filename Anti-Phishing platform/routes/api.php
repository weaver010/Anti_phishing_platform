<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UrlScanController;
use App\Http\Controllers\Api\MalwareScanController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserProgressController;
use App\Http\Controllers\TrainingContentController;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Api\SecurityNewsController;
use App\Http\Controllers\Api\CyberNewsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/training-contents', [TrainingContentController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // ✅ Progress tracking route
    Route::get('/user-progress', [UserProgressController::class, 'index']);

    // TrainingContent CRUD
    Route::post('/training-contents', [TrainingContentController::class, 'store']);
    Route::put('/training-contents/{trainingContent}', [TrainingContentController::class, 'update']);
    Route::delete('/training-contents/{trainingContent}', [TrainingContentController::class, 'destroy']);

    // URL Scan routes
    Route::prefix('url-scans')->group(function () {
        Route::get('/', [UrlScanController::class, 'index']);
        Route::post('/', [UrlScanController::class, 'store']);
        Route::get('/{scan}', [UrlScanController::class, 'show']);
        Route::delete('/{scan}', [UrlScanController::class, 'destroy']);
    });



    // Malware Scan routes
    Route::prefix('malware-scans')->group(function () {
        Route::get('/', [MalwareScanController::class, 'index']);
        Route::post('/', [MalwareScanController::class, 'store']);
        Route::get('/{scan}', [MalwareScanController::class, 'show']);
        Route::delete('/{scan}', [MalwareScanController::class, 'destroy']);
    });
});

Route::get('/news', [CyberNewsController::class, 'getNews']);

Route::get('/security-news', [SecurityNewsController::class, 'getSecurityNews']);
