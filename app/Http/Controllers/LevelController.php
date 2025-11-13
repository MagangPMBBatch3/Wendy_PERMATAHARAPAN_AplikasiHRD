<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    public function index()
    {
        return view('level.index');
    }

    public function create()
    {
        return view('level.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('level.index');
    }

    public function show(Level $level)
    {
        return view('level.show', compact('level'));
    }

    public function edit(Level $level)
    {
        return view('level.edit', compact('level'));
    }

    public function update(Request $request, Level $level)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('level.index');
    }

    public function destroy(Level $level)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('level.index');
    }
}
