<?php

namespace App\Http\Controllers;

use App\Models\Pengumuman;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    public function index()
    {
        return view('pengumuman.index');
    }

    public function create()
    {
        return view('pengumuman.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('pengumuman.index');
    }

    public function show(Pengumuman $pengumuman)
    {
        return view('pengumuman.show', compact('pengumuman'));
    }

    public function edit(Pengumuman $pengumuman)
    {
        return view('pengumuman.edit', compact('pengumuman'));
    }

    public function update(Request $request, Pengumuman $pengumuman)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('pengumuman.index');
    }

    public function destroy(Pengumuman $pengumuman)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('pengumuman.index');
    }
}
