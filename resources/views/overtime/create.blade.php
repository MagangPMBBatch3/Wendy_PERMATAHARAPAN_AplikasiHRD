@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Create Overtime</h1>
            <p class="text-gray-600">Add a new overtime record</p>
        </div>
        <a href="{{ route('overtime.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to List
        </a>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <form id="createOvertimeForm" class="space-y-6">
            @csrf

            <!-- Staff Selection -->
            <div>
                <label for="staff_id" class="block text-sm font-medium text-gray-700">Staff <span class="text-red-500">*</span></label>
                <select id="staff_id" name="staff_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select staff</option>
                    <!-- Staff will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the staff member for overtime</p>
            </div>

            <!-- Project Selection -->
            <div>
                <label for="proyek_id" class="block text-sm font-medium text-gray-700">Project <span class="text-red-500">*</span></label>
                <select id="proyek_id" name="proyek_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select project</option>
                    <!-- Projects will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the project for this overtime</p>
            </div>

            <!-- Payroll Period Selection -->
            <div>
                <label for="dt_payroll_id" class="block text-sm font-medium text-gray-700">Payroll Period <span class="text-red-500">*</span></label>
                <select id="dt_payroll_id" name="dt_payroll_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select payroll period</option>
                    <!-- Payroll periods will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the payroll period for this overtime</p>
            </div>

            <!-- Date -->
            <div>
                <label for="tanggal" class="block text-sm font-medium text-gray-700">Date <span class="text-red-500">*</span></label>
                <input type="date" id="tanggal" name="tanggal" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Date of the overtime work</p>
            </div>

            <!-- Start Time -->
            <div>
                <label for="waktu_mulai" class="block text-sm font-medium text-gray-700">Start Time <span class="text-red-500">*</span></label>
                <input type="datetime-local" id="waktu_mulai" name="waktu_mulai" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">When the overtime work started</p>
            </div>

            <!-- End Time -->
            <div>
                <label for="waktu_selesai" class="block text-sm font-medium text-gray-700">End Time <span class="text-red-500">*</span></label>
                <input type="datetime-local" id="waktu_selesai" name="waktu_selesai" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">When the overtime work ended</p>
            </div>

            <!-- Duration -->
            <div>
                <label for="durasi_jam" class="block text-sm font-medium text-gray-700">Duration (Hours) <span class="text-red-500">*</span></label>
                <input type="number" id="durasi_jam" name="durasi_jam" step="0.5" min="0.5" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                       placeholder="0.0">
                <p class="mt-1 text-sm text-gray-500">Total overtime hours worked</p>
            </div>

            <!-- Status -->
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700">Status <span class="text-red-500">*</span></label>
                <select id="status" name="status" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Current status of the overtime request</p>
            </div>

            <!-- Description -->
            <div>
                <label for="keterangan" class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
                <textarea id="keterangan" name="keterangan" rows="4" required
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Provide details about the overtime work..."></textarea>
                <p class="mt-1 text-sm text-gray-500">Detailed description of the overtime work</p>
            </div>

            <!-- Photo Upload -->
            <div>
                <label for="foto" class="block text-sm font-medium text-gray-700">Photo</label>
                <input type="file" id="foto" name="foto" accept="image/*"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Upload a photo of the overtime work (optional)</p>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a href="{{ route('overtime.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    Cancel
                </a>
                <button type="submit" id="submitBtn"
                        class="bg-gradient-primary text-white px-6 py-2 rounded-md hover:bg-gradient-secondary transition-colors duration-200 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Create Overtime
                </button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Overtime/overtime-create.js') }}"></script>
@endpush
@endsection
