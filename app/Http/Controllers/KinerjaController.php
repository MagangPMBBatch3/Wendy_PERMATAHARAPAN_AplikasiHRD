<?php

namespace App\Http\Controllers;

use App\Models\Kinerja;
use Illuminate\Http\Request;

class KinerjaController extends Controller
{
    public function index()
    {
        return view('kinerja.index');
    }

    public function create()
    {
        return view('kinerja.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('kinerja.index');
    }

    public function show(Kinerja $kinerja)
    {
        return view('kinerja.show', compact('kinerja'));
    }

    public function edit(Kinerja $kinerja)
    {
        return view('kinerja.edit', compact('kinerja'));
    }

    public function update(Request $request, Kinerja $kinerja)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('kinerja.index');
    }

    public function destroy(Kinerja $kinerja)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('kinerja.index');
    }
}
