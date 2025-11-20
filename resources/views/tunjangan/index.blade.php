@extends('layouts.app')

@section('content')
<div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Tunjangan Management</h1>
        <button onclick="crud.openCreate()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Tunjangan</button>
    </div>

    <div class="mb-6 flex gap-4">
        <div class="flex-1">
            <input type="text" id="searchInput" placeholder="Search tunjangan..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button id="searchBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">Search</button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Staff</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Type</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Start Date</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">End Date</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody id="dataTableBody">
                <tr><td colspan="7" class="text-center py-8 text-gray-500">Loading...</td></tr>
            </tbody>
        </table>
    </div>

    <div class="mt-6 flex justify-between items-center">
        <button id="prevPageBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Previous</button>
        <span id="currentPage" class="text-gray-700 font-medium">Page 1 of 1</span>
        <button id="nextPageBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Next</button>
    </div>
</div>

<div id="formModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96 max-h-96 overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
            <h2 id="modalTitle" class="text-2xl font-bold">Add New Tunjangan</h2>
            <button onclick="document.getElementById('formModal').classList.add('hidden')" class="text-2xl">&times;</button>
        </div>

        <form id="crud-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Staff</label>
                <select id="staff_id" name="staff_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg"></select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <input type="text" id="type" name="type" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input type="number" id="amount" name="amount" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            </div>
            <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button type="button" onclick="document.getElementById('formModal').classList.add('hidden')" class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script src="/js/crud-manager.js"></script>
<script src="/js/Tunjangan/tunjangan-crud.js"></script>
@endsection

    <!-- Search and Filter -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
                <input type="text" id="searchInput" placeholder="Search allowances..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
            <div class="flex gap-2">
                <select id="typeFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All Types</option>
                    <option value="transport">Transport</option>
                    <option value="makan">Meal</option>
                    <option value="lembur">Overtime</option>
                    <option value="lainnya">Other</option>
                </select>
                <input type="month" id="monthFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <button id="searchBtn" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Search
                </button>
            </div>
        </div>
    </div>

    <!-- Allowances Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody id="allowancesTableBody" class="bg-white divide-y divide-gray-200">
                    @forelse($tunjangans as $tunjangan)
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ $tunjangan->id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $tunjangan->staff->nama ?? 'N/A' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $tunjangan->jenis ?? 'N/A' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $tunjangan->periode ?? 'N/A' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Rp {{ number_format($tunjangan->jumlah, 0, ',', '.') }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $tunjangan->keterangan }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a href="{{ route('tunjangan.show', $tunjangan->id) }}" class="text-blue-600 hover:text-blue-900 mr-3">View</a>
                            <a href="{{ route('tunjangan.edit', $tunjangan->id) }}" class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</a>
                            <form method="POST" action="{{ route('tunjangan.destroy', $tunjangan->id) }}" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:text-red-900" onclick="return confirm('Are you sure?')">Delete</button>
                            </form>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="7" class="px-6 py-4 text-center text-gray-500">No allowances found.</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Loading State -->
        <div id="loadingState" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">Loading allowances...</span>
        </div>

        <!-- Empty State -->
        <div id="emptyState" class="hidden text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No allowances found</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new allowance.</p>
        </div>
    </div>

    <!-- Pagination -->
    <div id="paginationContainer" class="flex justify-center">
        <!-- Pagination will be loaded here -->
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Tunjangan/tunjangan-api.js') }}"></script>
<script src="{{ asset('js/Tunjangan/tunjangan.js') }}"></script>
@endpush
@endsection
