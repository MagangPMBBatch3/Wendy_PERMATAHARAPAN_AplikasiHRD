@extends('layouts.app')

@section('title', 'Attendance Management')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Attendance</h1>
        <a href="{{ route('absensi.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Record Attendance
        </a>
    </div>

    <div id="absensi-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading attendance data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/Absensi/absensi.js';
        script.onload = function() {
            loadAbsensiData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
