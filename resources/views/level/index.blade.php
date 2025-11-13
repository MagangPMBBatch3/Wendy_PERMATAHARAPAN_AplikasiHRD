@extends('layouts.app')

@section('title', 'Level Management')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Level Management</h1>
        <a href="{{ route('level.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Level
        </a>
    </div>

    <!-- Level List Container -->
    <div id="level-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading level data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/Level/level.js';
        script.onload = function() {
            loadLevelData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
