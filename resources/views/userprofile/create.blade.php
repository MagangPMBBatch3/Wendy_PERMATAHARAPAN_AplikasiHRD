@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Create User Profile</h1>
            <p class="text-gray-600">Add a new user profile to the system</p>
        </div>
        <a href="{{ route('userprofile.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to List
        </a>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <form id="createProfileForm" class="space-y-6">
            @csrf

            <!-- User Selection -->
            <div>
                <label for="user_id" class="block text-sm font-medium text-gray-700">User <span class="text-red-500">*</span></label>
                <select id="user_id" name="user_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select a user</option>
                    <!-- Users will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the user this profile belongs to</p>
            </div>

            <!-- Staff Selection -->
            <div>
                <label for="staff_id" class="block text-sm font-medium text-gray-700">Staff <span class="text-red-500">*</span></label>
                <select id="staff_id" name="staff_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select staff</option>
                    <!-- Staff will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the staff record associated with this profile</p>
            </div>

            <!-- Full Name -->
            <div>
                <label for="nama_lengkap" class="block text-sm font-medium text-gray-700">Full Name <span class="text-red-500">*</span></label>
                <input type="text" id="nama_lengkap" name="nama_lengkap" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Enter full name">
                <p class="mt-1 text-sm text-gray-500">The complete name of the user</p>
            </div>

            <!-- NRP -->
            <div>
                <label for="nrp" class="block text-sm font-medium text-gray-700">NRP</label>
                <input type="text" id="nrp" name="nrp"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Enter NRP (optional)">
                <p class="mt-1 text-sm text-gray-500">Nomor Registrasi Pegawai (Employee Registration Number)</p>
            </div>

            <!-- Address -->
            <div>
                <label for="alamat" class="block text-sm font-medium text-gray-700">Address</label>
                <textarea id="alamat" name="alamat" rows="3"
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter address (optional)"></textarea>
                <p class="mt-1 text-sm text-gray-500">Residential or contact address</p>
            </div>

            <!-- Photo Upload -->
            <div>
                <label for="foto" class="block text-sm font-medium text-gray-700">Photo</label>
                <input type="file" id="foto" name="foto" accept="image/*"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Upload a profile photo (optional)</p>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a href="{{ route('userprofile.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    Cancel
                </a>
                <button type="submit" id="submitBtn"
                        class="bg-gradient-primary text-white px-6 py-2 rounded-md hover:bg-gradient-secondary transition-colors duration-200 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Create Profile
                </button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/UserProfile/userprofile-create.js') }}"></script>
@endpush
@endsection
