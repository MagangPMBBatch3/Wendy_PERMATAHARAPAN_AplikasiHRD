@extends('layouts.app')

@section('title', 'Tasks Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Tasks Management</h1>
        <button onclick="crud.openCreate()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Task</button>
    </div>

    <div class="mb-6 flex gap-4">
        <div class="flex-1">
            <input type="text" id="searchInput" placeholder="Search tasks..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button id="searchBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">Search</button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Title</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Project</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Priority</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
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
            <h2 id="modalTitle" class="text-2xl font-bold">Add New Task</h2>
            <button onclick="document.getElementById('formModal').classList.add('hidden')" class="text-2xl">&times;</button>
        </div>

        <form id="crud-form" class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">Title</label>
                <input type="text" id="title" name="title" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Description</label>
                <textarea id="description" name="description" rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Project</label>
                <select id="project_id" name="project_id" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Project</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Status</label>
                <select id="status" name="status" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Priority</label>
                <select id="priority" name="priority" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Due Date</label>
                <input type="date" id="due_date" name="due_date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex gap-4 pt-6">
                <button type="submit" class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                <button type="button" onclick="document.getElementById('formModal').classList.add('hidden')" class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
        </form>
    </div>
</div>

<script src="/js/crud-manager.js"></script>
<script src="/js/Tasks/tasks-crud.js"></script>
@endsection
                    <option value="completed">Completed</option>
                </select>
                <select id="priorityFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
                <button id="searchBtn" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                    Search
                </button>
            </div>
        </div>
    </div>

    <!-- Tasks Table -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody id="tasksTableBody" class="bg-white divide-y divide-gray-200">
                    <!-- Data will be loaded here -->
                </tbody>
            </table>
        </div>

        <!-- Loading State -->
        <div id="loadingState" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">Loading tasks...</span>
        </div>

        <!-- Empty State -->
        <div id="emptyState" class="hidden text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
        </div>
    </div>

    <!-- Pagination -->
    <div id="paginationContainer" class="flex justify-center">
        <!-- Pagination will be loaded here -->
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Tasks/tasks-api.js') }}"></script>
<script src="{{ asset('js/Tasks/tasks.js') }}"></script>
@endpush
@endsection
