@extends('layouts.app')

@section('content')
<div class="bg-white shadow-lg rounded-lg p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">{{ $title }}</h1>
        <button onclick="openCreateModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            + Add New
        </button>
    </div>

    <!-- Search Bar -->
    <div class="mb-6 flex gap-2">
        <input type="text" id="searchInput" placeholder="Search..." class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
        <button id="searchBtn" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Search</button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
        <table class="w-full border-collapse">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                    {{ $tableHeaders }}
                    <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
            </thead>
            <tbody id="dataTableBody">
                <tr>
                    <td colspan="10" class="text-center py-8">
                        <p class="text-gray-600">Loading data...</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-between items-center">
        <div class="text-sm text-gray-600">
            <span id="currentPage">Page 1 of 1</span>
        </div>
        <div class="flex gap-2">
            <button id="prevPageBtn" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Previous</button>
            <button id="nextPageBtn" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">Next</button>
        </div>
    </div>
</div>

<!-- Create/Edit Modal -->
<div id="formModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 id="modalTitle" class="text-2xl font-bold mb-4 text-gray-800">Add New</h2>
        
        <form id="crud-form" class="space-y-4">
            {{ $formFields }}
        </form>

        <div class="flex gap-4 mt-6">
            <button type="submit" form="crud-form" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Save</button>
            <button type="button" onclick="closeCreateModal()" class="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">Cancel</button>
        </div>
    </div>
</div>

<script>
    function openCreateModal() {
        document.getElementById('modalTitle').textContent = 'Add New';
        document.getElementById('crud-form').reset();
        document.getElementById('formModal').classList.remove('hidden');
    }

    function closeCreateModal() {
        document.getElementById('formModal').classList.add('hidden');
    }

    function showNotification(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} z-50`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 3000);
    }

    function showLoading(element) {
        element.innerHTML = '<tr><td colspan="10" class="text-center py-8"><p class="text-gray-600">Loading...</p></td></tr>';
    }

    function formatDate(date) {
        return date ? new Date(date).toLocaleDateString() : '-';
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount || 0);
    }
</script>

@endsection
