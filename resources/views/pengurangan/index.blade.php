
@extends('layouts.app')

@section('title', 'Pengurangan Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Pengurangan Management</h1>
        <button onclick="openAddModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add New Deduction</button>
    </div>

    <div class="mb-6 flex gap-4">
        <div class="flex-1">
            <input type="text" id="searchInput" placeholder="Search deductions..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <button id="searchBtn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">Search</button>
    </div>

    <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="min-w-full">
            <thead class="bg-gray-100 border-b">
                <tr>
                    <th class="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Staff</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Payroll Period</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                    <th class="px-6 py-4 text-left text-sm font-semibold">Description</th>
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

@include('components.pengurangan.modal-add')
@include('components.pengurangan.modal-edit')

<script src="{{ asset('js/Pengurangan/pengurangan.js') }}"></script>
@endsection
