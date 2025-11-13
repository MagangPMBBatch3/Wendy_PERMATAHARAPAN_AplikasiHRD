@extends('layouts.app')

@section('title', 'Edit Announcement')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Edit Announcement</h1>
    
    <div id="pengumuman-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const pengumumanId = {{ $pengumuman->id }};
        const script = document.createElement('script');
        script.src = '/js/Pengumuman/pengumuman-edit.js';
        script.onload = function() {
            if (typeof loadPengumumanEdit === 'function') {
                loadPengumumanEdit(pengumumanId);
            }
        };
        document.body.appendChild(script);
    });
</script>
@endsection
