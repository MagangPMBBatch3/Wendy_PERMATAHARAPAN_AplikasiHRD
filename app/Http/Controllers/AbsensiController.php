<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    public function index()
    {
        return view('absensi.index');
    }

    public function create()
    {
        return view('absensi.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('absensi.index');
    }

    public function show(Absensi $absensi)
    {
        return view('absensi.show', compact('absensi'));
    }

    public function edit(Absensi $absensi)
    {
        return view('absensi.edit', compact('absensi'));
    }

    public function update(Request $request, Absensi $absensi)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('absensi.index');
    }

    public function destroy(Absensi $absensi)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('absensi.index');
    }
}
