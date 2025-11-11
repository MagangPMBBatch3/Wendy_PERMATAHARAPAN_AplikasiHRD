@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Edit Allowance</h1>
            <p class="text-gray-600">Update allowance details</p>
        </div>
        <div class="flex space-x-3">
            <a href="{{ route('tunjangan.show', $tunjangan->id ?? '') }}" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                View Details
            </a>
            <a href="{{ route('tunjangan.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to List
            </a>
        </div>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <form id="editAllowanceForm" class="space-y-6">
            @csrf

            <!-- Staff Selection -->
            <div>
                <label for="staff_id" class="block text-sm font-medium text-gray-700">Staff <span class="text-red-500">*</span></label>
                <select id="staff_id" name="staff_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select staff</option>
                    <!-- Staff will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the staff member for this allowance</p>
            </div>

            <!-- Payroll Period Selection -->
            <div>
                <label for="dt_payroll_id" class="block text-sm font-medium text-gray-700">Payroll Period <span class="text-red-500">*</span></label>
                <select id="dt_payroll_id" name="dt_payroll_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select payroll period</option>
                    <!-- Payroll periods will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the payroll period for this allowance</p>
            </div>

            <!-- Type -->
            <div>
                <label for="tipe" class="block text-sm font-medium text-gray-700">Type <span class="text-red-500">*</span></label>
                <select id="tipe" name="tipe" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select type</option>
                    <option value="transport">Transport Allowance</option>
                    <option value="makan">Meal Allowance</option>
                    <option value="lembur">Overtime Allowance</option>
                    <option value="lainnya">Other Allowance</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the type of allowance</p>
            </div>

            <!-- Date -->
            <div>
                <label for="tanggal" class="block text-sm font-medium text-gray-700">Date <span class="text-red-500">*</span></label>
                <input type="date" id="tanggal" name="tanggal" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Date of the allowance</p>
            </div>

            <!-- Month and Year -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="bulan" class="block text-sm font-medium text-gray-700">Month <span class="text-red-500">*</span></label>
                    <select id="bulan" name="bulan" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div>
                    <label for="tahun" class="block text-sm font-medium text-gray-700">Year <span class="text-red-500">*</span></label>
                    <input type="number" id="tahun" name="tahun" min="2020" max="2030" required
                           class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           placeholder="2024">
                </div>
            </div>

            <!-- Amount -->
            <div>
                <label for="jumlah" class="block text-sm font-medium text-gray-700">Amount <span class="text-red-500">*</span></label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">Rp</span>
                    </div>
                    <input type="number" id="jumlah" name="jumlah" step="0.01" min="0" required
                           class="pl-12 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                           placeholder="0.00">
                </div>
                <p class="mt-1 text-sm text-gray-500">Allowance amount in Rupiah</p>
            </div>

            <!-- Description -->
            <div>
                <label for="keterangan" class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
                <textarea id="keterangan" name="keterangan" rows="4" required
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Provide details about this allowance..."></textarea>
                <p class="mt-1 text-sm text-gray-500">Detailed description of the allowance</p>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a href="{{ route('tunjangan.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    Cancel
                </a>
                <button type="submit" id="submitBtn"
                        class="bg-gradient-primary text-white px-6 py-2 rounded-md hover:bg-gradient-secondary transition-colors duration-200 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Update Allowance
                </button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Tunjangan/tunjangan-edit.js') }}"></script>
@endpush
@endsection
