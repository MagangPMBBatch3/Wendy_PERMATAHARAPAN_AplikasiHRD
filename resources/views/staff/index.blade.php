@extends('layouts.app')

@section('title', 'Staff Management')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Staff Management</h1>
        <a href="{{ route('staff.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Staff
        </a>
    </div>

    <!-- Staff List Container -->
    <div id="staff-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading staff data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Load the staff.js view
        const script = document.createElement('script');
        script.src = '/js/Staff/staff.js';
        script.onload = function() {
            loadStaffData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
