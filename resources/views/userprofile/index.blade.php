@extends('layouts.app')

@section('title', 'UserProfile Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">UserProfile Management</h1>
        <button onclick="crud.openCreate()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Profile</button>
    </div>

    <div class="mb-6 flex gap-4">
        <div class="flex-1">
            <input type="text" id="searchInput" placeholder="Search profiles..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button id="searchBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">Search</button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">User</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">City</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody id="dataTableBody">
                <tr><td colspan="5" class="text-center py-8 text-gray-500">Loading...</td></tr>
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
            <h2 id="modalTitle" class="text-2xl font-bold">Add New Profile</h2>
            <button onclick="document.getElementById('formModal').classList.add('hidden')" class="text-2xl">&times;</button>
        </div>

        <form id="crud-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">User</label>
                <select id="user_id" name="user_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select User</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Phone</label>
                <input type="text" id="phone" name="phone" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Address</label>
                <input type="text" id="address" name="address" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">City</label>
                <input type="text" id="city" name="city" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button type="button" onclick="document.getElementById('formModal').classList.add('hidden')" class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script src="/js/crud-manager.js"></script>
<script src="/js/UserProfile/userprofile-crud.js"></script>
@endsection
