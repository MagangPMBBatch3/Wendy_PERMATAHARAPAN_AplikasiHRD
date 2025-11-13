@extends('layouts.app')

@section('title', 'Performance Management')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Performance Evaluations</h1>
        <a href="{{ route('kinerja.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Evaluation
        </a>
    </div>

    <div id="kinerja-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading performance data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/Kinerja/kinerja.js';
        script.onload = function() {
            loadKinerjaData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
