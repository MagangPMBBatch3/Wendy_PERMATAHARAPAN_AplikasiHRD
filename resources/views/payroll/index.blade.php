@extends('layouts.app')

@section('title', 'Payroll Management')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Payroll Management</h1>
        <a href="{{ route('payroll.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Create Payroll
        </a>
    </div>

    <div id="payroll-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading payroll data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/Payroll/payroll.js';
        script.onload = function() {
            loadPayrollData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
