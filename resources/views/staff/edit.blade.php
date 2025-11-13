@extends('layouts.app')

@section('title', 'Edit Staff')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Staff</h1>
    
    <!-- Form Container -->
    <div id="staff-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const staffId = {{ $staff->id }};
        // Load the staff-edit.js view
        const script = document.createElement('script');
        script.src = '/js/Staff/staff-edit.js';
        script.onload = function() {
            if (typeof loadStaffEdit === 'function') {
                loadStaffEdit(staffId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
