@extends('layouts.app')

@section('title', 'Activity Log')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Activity Log</h1>
        <p class="text-gray-600 mt-2">View all system activities and changes</p>
    </div>

    <div id="activitylog-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading activity log...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/ActivityLog/activitylog.js';
        script.onload = function() {
            loadActivityLogData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
