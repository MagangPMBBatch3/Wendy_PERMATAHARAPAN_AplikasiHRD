@extends('layouts.app')

@section('title', 'Detail Payroll')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Detail Payroll</h1>
        <a href="{{ route('detailpayroll.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Detail
        </a>
    </div>

    <div id="detailpayroll-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading detail payroll data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/DetailPayroll/detailpayroll.js';
        script.onload = function() {
            if (typeof loadDetailPayrollData === 'function') loadDetailPayrollData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
