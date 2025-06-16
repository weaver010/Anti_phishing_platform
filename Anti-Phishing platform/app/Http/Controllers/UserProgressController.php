<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserProgress;

class UserProgressController extends Controller
{
    public function index(Request $request)
    {
        $userId = auth()->id(); // لازم يكون المستخدم مسجّل دخول
        $progress = UserProgress::where('user_id', $userId)->get();

        return response()->json($progress);
    }
}
