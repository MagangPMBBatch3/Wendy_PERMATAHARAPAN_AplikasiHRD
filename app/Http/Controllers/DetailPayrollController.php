<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DetailPayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('detailpayroll.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('detailpayroll.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return view('detailpayroll.store');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return view('detailpayroll.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return view('detailpayroll.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return view('detailpayroll.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return view('detailpayroll.index');
    }
}
