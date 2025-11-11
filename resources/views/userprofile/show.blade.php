@extends('layouts.app')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">User Profile Details</h1>
            <p class="text-gray-600">View detailed information about this user profile</p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('userprofile.edit', $profile->id ?? '') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit
            </a>
            <a href="{{ route('userprofile.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to List
            </a>
        </div>
    </div>

    <!-- Profile Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Photo and Basic Info -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="text-center">
                    <div id="profilePhoto" class="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <!-- Photo will be loaded here -->
                        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <h3 id="profileName" class="text-xl font-semibold text-gray-900 mb-2">Loading...</h3>
                    <p id="profileNRP" class="text-gray-600 mb-4">NRP: Loading...</p>
                    <div class="space-y-2 text-sm text-gray-600">
                        <p><strong>User ID:</strong> <span id="userId">Loading...</span></p>
                        <p><strong>Staff ID:</strong> <span id="staffId">Loading...</span></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detailed Information -->
        <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Profile Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Full Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Full Name</label>
                        <p id="namaLengkap" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                    </div>

                    <!-- NRP -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">NRP</label>
                        <p id="nrp" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                    </div>

                    <!-- Address -->
                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700">Address</label>
                        <p id="alamat" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[3rem]">Loading...</p>
                    </div>

                    <!-- Created At -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Created At</label>
                        <p id="createdAt" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                    </div>

                    <!-- Updated At -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Last Updated</label>
                        <p id="updatedAt" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                    </div>
                </div>
            </div>

            <!-- Related Information -->
            <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4">Related Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- User Details -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Associated User</label>
                        <div id="userDetails" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                            Loading...
                        </div>
                    </div>

                    <!-- Staff Details -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Associated Staff</label>
                        <div id="staffDetails" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
                            Loading...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
        <div class="flex flex-wrap gap-3">
            <button id="deleteBtn" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete Profile
            </button>
            <button id="restoreBtn" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center hidden">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Restore Profile
            </button>
        </div>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Profile</h3>
            <p class="text-sm text-gray-500 mb-4">Are you sure you want to delete this user profile? This action cannot be undone.</p>
            <div class="flex justify-center space-x-3">
                <button id="cancelDeleteBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    Cancel
                </button>
                <button id="confirmDeleteBtn" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200">
                    Delete
                </button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/UserProfile/userprofile.js') }}"></script>
@endpush
@endsection
