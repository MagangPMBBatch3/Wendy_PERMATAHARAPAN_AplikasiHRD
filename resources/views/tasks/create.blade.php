@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Create Task</h1>
            <p class="text-gray-600">Add a new task assignment</p>
        </div>
        <a href="{{ route('tasks.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to List
        </a>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg shadow-sm p-6">
        <form id="createTaskForm" class="space-y-6">
            @csrf

            <!-- Creator Selection (Auto-filled if logged in) -->
            <div>
                <label for="creator_id" class="block text-sm font-medium text-gray-700">Creator</label>
                <select id="creator_id" name="creator_id" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select creator</option>
                    <!-- Staff will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Task creator (auto-filled if logged in)</p>
            </div>

            <!-- Assignee Selection -->
            <div>
                <label for="assignee_id" class="block text-sm font-medium text-gray-700">Assignee <span class="text-red-500">*</span></label>
                <select id="assignee_id" name="assignee_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select assignee</option>
                    <!-- Staff will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Staff member assigned to this task</p>
            </div>

            <!-- Project Selection -->
            <div>
                <label for="proyek_id" class="block text-sm font-medium text-gray-700">Project <span class="text-red-500">*</span></label>
                <select id="proyek_id" name="proyek_id" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select project</option>
                    <!-- Projects will be loaded here -->
                </select>
                <p class="mt-1 text-sm text-gray-500">Project this task belongs to</p>
            </div>

            <!-- Title -->
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700">Title <span class="text-red-500">*</span></label>
                <input type="text" id="title" name="title" required
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Enter task title">
                <p class="mt-1 text-sm text-gray-500">Brief title for the task</p>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" rows="4"
                          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Provide detailed description of the task..."></textarea>
                <p class="mt-1 text-sm text-gray-500">Detailed description of what needs to be done</p>
            </div>

            <!-- Due Date -->
            <div>
                <label for="due_date" class="block text-sm font-medium text-gray-700">Due Date</label>
                <input type="date" id="due_date" name="due_date"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">When this task should be completed</p>
            </div>

            <!-- Start Date/Time -->
            <div>
                <label for="start_at" class="block text-sm font-medium text-gray-700">Start Date/Time</label>
                <input type="datetime-local" id="start_at" name="start_at"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">When work on this task should begin</p>
            </div>

            <!-- End Date/Time -->
            <div>
                <label for="end_at" class="block text-sm font-medium text-gray-700">End Date/Time</label>
                <input type="datetime-local" id="end_at" name="end_at"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">When work on this task should end</p>
            </div>

            <!-- Priority -->
            <div>
                <label for="priority" class="block text-sm font-medium text-gray-700">Priority <span class="text-red-500">*</span></label>
                <select id="priority" name="priority" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Task priority level</p>
            </div>

            <!-- Status -->
            <div>
                <label for="status" class="block text-sm font-medium text-gray-700">Status <span class="text-red-500">*</span></label>
                <select id="status" name="status" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select status</option>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                </select>
                <p class="mt-1 text-sm text-gray-500">Current status of the task</p>
            </div>

            <!-- Attachment Upload -->
            <div>
                <label for="attachment" class="block text-sm font-medium text-gray-700">Attachment</label>
                <input type="file" id="attachment" name="attachment"
                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Upload task-related files (optional)</p>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <a href="{{ route('tasks.index') }}" class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200">
                    Cancel
                </a>
                <button type="submit" id="submitBtn"
                        class="bg-gradient-primary text-white px-6 py-2 rounded-md hover:bg-gradient-secondary transition-colors duration-200 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Create Task
                </button>
            </div>
        </form>
    </div>
</div>

@push('scripts')
<script src="{{ asset('js/Tasks/tasks-create.js') }}"></script>
@endpush
@endsection
