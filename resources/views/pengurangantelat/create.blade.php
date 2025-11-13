@extends('layouts.app')

@section('title', 'Add Late Deduction')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Add Late Deduction</h1>

    <div id="pengurangantelat-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/PenguranganTelat/pengurangantelat-create.js';
        document.body.appendChild(script);
    });
</script>
@endsection
