@extends('layouts.app')

@section('title', 'Edit Attendance')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Attendance Record</h1>
    
    <div id="absensi-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const absensiId = {{ $absensi->id }};
        const script = document.createElement('script');
        script.src = '/js/Absensi/absensi-edit.js';
        script.onload = function() {
            if (typeof loadAbsensiEdit === 'function') {
                loadAbsensiEdit(absensiId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
