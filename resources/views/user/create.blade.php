@extends('layouts.app')

@section('title', 'Add User')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Add New User</h1>
    
    <div id="user-form-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading form...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/User/user-create.js';
        document.body.appendChild(script);
    });
</script>
@endsection
