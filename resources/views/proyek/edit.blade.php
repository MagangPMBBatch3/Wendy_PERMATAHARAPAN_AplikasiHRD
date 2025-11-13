@extends('layouts.app')

@section('title', 'Edit Project')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Project</h1>
    
    <div id="proyek-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const proyekId = {{ $proyek->id }};
        const script = document.createElement('script');
        script.src = '/js/Proyek/proyek-edit.js';
        script.onload = function() {
            if (typeof loadProyekEdit === 'function') {
                loadProyekEdit(proyekId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
