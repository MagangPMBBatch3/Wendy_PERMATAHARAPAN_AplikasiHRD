@extends('layouts.app')

@section('title', 'Edit Payroll')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Payroll</h1>
    
    <div id="payroll-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const payrollId = {{ $payroll->id }};
        const script = document.createElement('script');
        script.src = '/js/Payroll/payroll-edit.js';
        script.onload = function() {
            if (typeof loadPayrollEdit === 'function') {
                loadPayrollEdit(payrollId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
