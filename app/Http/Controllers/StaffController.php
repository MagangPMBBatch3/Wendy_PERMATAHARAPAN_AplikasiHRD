<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function index()
    {
        return view('staff.index');
    }

    public function create()
    {
        return view('staff.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('staff.index');
    }

    public function show(Staff $staff)
    {
        return view('staff.show', compact('staff'));
    }

    public function edit(Staff $staff)
    {
        return view('staff.edit', compact('staff'));
    }

    public function update(Request $request, Staff $staff)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('staff.index');
    }

    public function destroy(Staff $staff)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('staff.index');
    }
}
