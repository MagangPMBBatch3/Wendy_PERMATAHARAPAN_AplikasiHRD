@extends('layouts.app')

@section('title', 'Edit Level')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Level</h1>
    
    <div id="level-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const levelId = {{ $level->id }};
        const script = document.createElement('script');
        script.src = '/js/Level/level-edit.js';
        script.onload = function() {
            if (typeof loadLevelEdit === 'function') {
                loadLevelEdit(levelId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
