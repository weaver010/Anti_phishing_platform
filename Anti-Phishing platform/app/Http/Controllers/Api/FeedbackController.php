<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;
use Illuminate\Support\Facades\Auth;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'type' => 'nullable|string',
        ]);

        $feedback = Feedback::create([
            'message' => $validated['message'],
            'type' => $validated['type'] ?? null,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['success' => true, 'message' => 'Feedback submitted successfully.']);
    }
}
