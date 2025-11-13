<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use Illuminate\Http\Request;

class PayrollController extends Controller
{
    public function index()
    {
        return view('payroll.index');
    }

    public function create()
    {
        return view('payroll.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('payroll.index');
    }

    public function show(Payroll $payroll)
    {
        return view('payroll.show', compact('payroll'));
    }

    public function edit(Payroll $payroll)
    {
        return view('payroll.edit', compact('payroll'));
    }

    public function update(Request $request, Payroll $payroll)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('payroll.index');
    }

    public function destroy(Payroll $payroll)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('payroll.index');
    }
}
