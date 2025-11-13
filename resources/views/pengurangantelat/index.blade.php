@extends('layouts.app')

@section('title', 'Late Deductions')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Late Deductions</h1>
        <a href="{{ route('pengurangantelat.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add Late Deduction
        </a>
    </div>

    <div id="pengurangantelat-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading late deduction data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/PenguranganTelat/pengurangantelat.js';
        script.onload = function() {
            if (typeof loadPenguranganTelatData === 'function') loadPenguranganTelatData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
