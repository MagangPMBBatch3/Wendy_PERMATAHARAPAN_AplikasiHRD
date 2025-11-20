@extends('layouts.app')

@section('title', 'Staff Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Staff Management</h1>
        <button onclick="crud.openCreate()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Staff
        </button>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 flex gap-4">
        <div class="flex-1">
            <input type="text" id="searchInput" placeholder="Search staff..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button id="searchBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">
            Search
        </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Level</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hire Date</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Salary</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Points</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
            </thead>
            <tbody id="dataTableBody">
                <tr>
                    <td colspan="7" class="text-center py-8 text-gray-500">Loading...</td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex justify-between items-center">
        <button id="prevPageBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Previous
        </button>
        <span id="currentPage" class="text-gray-700 font-medium">Page 1 of 1</span>
        <button id="nextPageBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Next
        </button>
    </div>
</div>

<!-- Modal for Create/Edit -->
<div id="formModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96 max-h-96 overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
            <h2 id="modalTitle" class="text-2xl font-bold text-gray-900">Add New Staff</h2>
            <button onclick="document.getElementById('formModal').classList.add('hidden')" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>

        <form id="crud-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">User</label>
                <select id="user_id" name="user_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select User</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select id="level_id" name="level_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Level</option>
                </select>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Hire Date</label>
                <input type="date" id="hire_date" name="hire_date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input type="number" id="salary" name="salary" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <input type="number" id="points" name="points" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                </button>
                <button type="button" onclick="document.getElementById('formModal').classList.add('hidden')" class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Import Scripts -->
<script src="/js/crud-manager.js"></script>
<script src="/js/Staff/staff-crud.js"></script>
@endsection
