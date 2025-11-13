@extends('layouts.app')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Pengurangan</h1>
            <p class="text-gray-600">Manage staff deductions and reductions</p>
        </div>
        <a href="{{ route('pengurangan.create') }}" class="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:bg-gradient-secondary transition-colors duration-200 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Add Deduction
        </a>
    </div>

    <!-- Search and Filter -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
                <input type="text" id="searchInput" placeholder="Search deductions..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="flex gap-2">
                <input type="date" id="dateFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <button id="searchBtn" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Search
                </button>
            </div>
        </div>
    </div>

    <!-- Deductions Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payroll Period</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody id="deductionsTableBody" class="bg-white divide-y divide-gray-200">
                    @forelse($pengurangan ?? [] as $item)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $item->id }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $item->staff->nama ?? 'N/A' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $item->detailPayroll->periode ?? 'N/A' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ \Carbon\Carbon::parse($item->tanggal)->format('M d, Y') }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp {{ number_format($item->jumlah, 0, ',', '.') }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ Str::limit($item->keterangan, 50) }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex space-x-2">
                                    <a href="{{ route('pengurangan.show', $item->id) }}" class="text-blue-600 hover:text-blue-900">View</a>
                                    <a href="{{ route('pengurangan.edit', $item->id) }}" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                    <form method="POST" action="{{ route('pengurangan.destroy', $item->id) }}" class="inline-block">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-900" onclick="return confirm('Are you sure you want to delete this deduction?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">No deductions found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Loading State -->
        <div id="loadingState" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">Loading deductions...</span>
        </div>

        <!-- Empty State -->
        <div id="emptyState" class="hidden text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No deductions found</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new deduction.</p>
        </div>
    </div>

    <!-- Pagination -->
    <div id="paginationContainer" class="flex justify-center">
        <!-- Pagination will be loaded here -->
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Pengurangan/pengurangan-api.js') }}"></script>
<script src="{{ asset('js/Pengurangan/pengurangan.js') }}"></script>
@endpush
@endsection
