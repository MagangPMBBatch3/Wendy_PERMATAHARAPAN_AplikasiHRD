@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Create Request</h1>
            <p class="text-gray-600">Submit a new staff request</p>
        </div>
        <a href="{{ route('permintaan.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to List
        </a>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <form id="createRequestForm" class="space-y-6">
            @csrf

            <!-- Staff Selection -->
            <div>
                <label for="staff_id" class="block text-sm font-medium text-gray-700">Staff <span class="text-red-500">*</span></label>
                <select id="staff_id" name="staff_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select staff</option>
                    @foreach($staffs as $staff)
                        <option value="{{ $staff->id }}">{{ $staff->nama }}</option>
                    @endforeach
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the staff member making this request</p>
            </div>

            <!-- Request Type -->
            <div>
                <label for="tipe" class="block text-sm font-medium text-gray-700">Request Type <span class="text-red-500">*</span></label>
                <select id="tipe" name="tipe" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select type</option>
                    <option value="cuti">Cuti (Leave)</option>
                    <option value="izin">Izin (Permission)</option>
                    <option value="lembur">Lembur (Overtime)</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Type of request being submitted</p>
            </div>

            <!-- Date -->
            <div>
                <label for="tanggal" class="block text-sm font-medium text-gray-700">Date <span class="text-red-500">*</span></label>
                <input type="date" id="tanggal" name="tanggal" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Date of the request</p>
            </div>

            <!-- Time Range (for izin/lembur) -->
            <div id="timeRangeContainer" class="hidden space-y-4">
                <div>
                    <label for="waktu_mulai" class="block text-sm font-medium text-gray-700">Start Time</label>
                    <input type="time" id="waktu_mulai" name="waktu_mulai"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <p class="mt-1 text-sm text-gray-500">Start time of the request</p>
                </div>
                <div>
                    <label for="waktu_selesai" class="block text-sm font-medium text-gray-700">End Time</label>
                    <input type="time" id="waktu_selesai" name="waktu_selesai"
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <p class="mt-1 text-sm text-gray-500">End time of the request</p>
                </div>
            </div>

            <!-- Description -->
            <div>
                <label for="keterangan" class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
                <textarea id="keterangan" name="keterangan" rows="4" required
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Provide details about your request..."></textarea>
                <p class="mt-1 text-sm text-gray-500">Detailed description of the request</p>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a href="{{ route('permintaan.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    Cancel
                </a>
                <button type="submit" id="submitBtn"
                        class="bg-gradient-primary text-white px-6 py-2 rounded-md hover:bg-gradient-secondary transition-colors duration-200 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Submit Request
                </button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Permintaan/permintaan-create.js') }}"></script>
@endpush
@endsection
