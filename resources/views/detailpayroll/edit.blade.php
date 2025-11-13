@extends('layouts.app')

@section('title', 'Edit Detail Payroll')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Detail Payroll</h1>

    <div id="detailpayroll-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const detailPayrollId = {{ $detailpayroll->id }};
        const script = document.createElement('script');
        script.src = '/js/DetailPayroll/detailpayroll-edit.js';
        script.onload = function() {
            if (typeof loadDetailPayrollEdit === 'function') loadDetailPayrollEdit(detailPayrollId);
        };
        document.body.appendChild(script);
    });
</script>
@endsection
