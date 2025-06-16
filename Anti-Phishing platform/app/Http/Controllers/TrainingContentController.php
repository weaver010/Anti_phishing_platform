<?php

namespace App\Http\Controllers;

use App\Models\TrainingContent;
use Illuminate\Http\Request;

class TrainingContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index()
{
    return response()->json(TrainingContent::all());
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|string|max:50',
            'video_url' => 'nullable|string|max:255',
            'difficulty_level' => 'required|string|max:50',
        ]);
        $content = TrainingContent::create($validated);
        return response()->json($content, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TrainingContent $trainingContent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TrainingContent $trainingContent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TrainingContent $trainingContent)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'type' => 'sometimes|required|string|max:50',
            'video_url' => 'nullable|string|max:255',
            'difficulty_level' => 'sometimes|required|string|max:50',
        ]);
        $trainingContent->update($validated);
        return response()->json($trainingContent);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TrainingContent $trainingContent)
    {
        $trainingContent->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
