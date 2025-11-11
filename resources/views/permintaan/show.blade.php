@extends('layouts.app')

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Request Details</h1>
            <p class="text-gray-600">View detailed information about this request</p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('permintaan.edit', $request->id ?? '') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Edit
            </a>
            <a href="{{ route('permintaan.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to List
            </a>
        </div>
    </div>

    <!-- Request Details -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Request Information</h4>
            <div class="space-y-4">
                <!-- Request Type -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Request Type</label>
                    <p id="requestType" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                </div>

                <!-- Date -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Date</label>
                    <p id="requestDate" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                </div>

                <!-- Time Range -->
                <div id="timeRangeDisplay">
                    <label class="block text-sm font-medium text-gray-700">Time Range</label>
                    <p id="requestTime" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                </div>

                <!-- Description -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <p id="requestDescription" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md min-h-[3rem]">Loading...</p>
                </div>
            </div>
        </div>

        <!-- Staff Information -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Staff Information</h4>
            <div class="space-y-4">
                <!-- Staff Name -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Staff Name</label>
                    <p id="staffName" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                </div>

                <!-- Staff ID -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Staff ID</label>
                    <p id="staffId" class="mt-1 text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-md">Loading...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Timeline -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Request Timeline</h4>
        <div class="space-y-4">
            <!-- Created -->
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Request Created</p>
                    <p id="createdAt" class="text-sm text-gray-500">Loading...</p>
                </div>
            </div>

            <!-- Updated -->
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">Last Updated</p>
                    <p id="updatedAt" class="text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Actions -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">Actions</h4>
        <div class="flex flex-wrap gap-3">
            <button id="approveBtn" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Approve Request
            </button>
            <button id="rejectBtn" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Reject Request
            </button>
            <button id="deleteBtn" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Delete Request
            </button>
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
                <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Request</h3>
                <p class="text-sm text-gray-500 mb-4">Are you sure you want to delete this request? This action cannot be undone.</p>
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
<script src="{{ asset('js/Permintaan/permintaan.js') }}"></script>
@endpush
@endsection
