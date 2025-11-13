<?php

namespace App\Http\Controllers;

use App\Models\Proyek;
use Illuminate\Http\Request;

class ProyekController extends Controller
{
    public function index()
    {
        return view('proyek.index');
    }

    public function create()
    {
        return view('proyek.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('proyek.index');
    }

    public function show(Proyek $proyek)
    {
        return view('proyek.show', compact('proyek'));
    }

    public function edit(Proyek $proyek)
    {
        return view('proyek.edit', compact('proyek'));
    }

    public function update(Request $request, Proyek $proyek)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('proyek.index');
    }

    public function destroy(Proyek $proyek)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('proyek.index');
    }
}
