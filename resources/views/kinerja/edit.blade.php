@extends('layouts.app')

@section('title', 'Edit Performance Evaluation')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Performance Evaluation</h1>
    
    <div id="kinerja-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const kinerjaId = {{ $kinerja->id }};
        const script = document.createElement('script');
        script.src = '/js/Kinerja/kinerja-edit.js';
        script.onload = function() {
            if (typeof loadKinerjaEdit === 'function') {
                loadKinerjaEdit(kinerjaId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
