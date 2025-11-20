@extends('layouts.app')

@section('title', 'Project Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Project Management</h1>
        <button onclick="crud.openCreate()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Project</button>
    </div>

    <div class="mb-6 flex gap-4">
        <div class="flex-1">
            <input type="text" id="searchInput" placeholder="Search projects..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button id="searchBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">Search</button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Description</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Start Date</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">End Date</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
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
            <h2 id="modalTitle" class="text-2xl font-bold">Add New Project</h2>
            <button onclick="document.getElementById('formModal').classList.add('hidden')" class="text-2xl">&times;</button>
        </div>

        <form id="crud-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Description</label>
                <textarea id="description" name="description" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Start Date</label>
                <input type="date" id="start_date" name="start_date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">End Date</label>
                <input type="date" id="end_date" name="end_date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Status</label>
                <select id="status" name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button type="button" onclick="document.getElementById('formModal').classList.add('hidden')" class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script src="/js/crud-manager.js"></script>
<script src="/js/Proyek/proyek-crud.js"></script>
@endsection
        </a>
    </div>

    <div id="proyek-container">
        <div class="text-center py-8">
            <p class="text-gray-600">Loading project data...</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const script = document.createElement('script');
        script.src = '/js/Proyek/proyek.js';
        script.onload = function() {
            loadProyekData();
        };
        document.body.appendChild(script);
    });
</script>
@endsection
