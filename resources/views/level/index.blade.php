@extends('layouts.app')

@section('title', 'Level')

@section('content')
    <div class="bg-slate-800/90 p-4 rounded-xl shadow w-full">
        <h1 class="text-2xl font-bold mb-4 text-white">Data Level</h1>

        {{-- Tombol Tambah & Pencarian --}}
        <div class="flex justify-between mb-4">
            <input
                type="text"
                id="searchInput"
                placeholder="Cari ID atau Nama..."
                class="bg-slate-700/70 text-gray-200 placeholder-gray-400 border border-slate-600 p-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                oninput="searchLevel()">

            <button onclick="openAddModal()"
                class="bg-blue-500 text-white px-4 py-2 rounded">
                Tambah Data
            </button>
        </div>

        {{-- Tabel Data --}}
        <table class="w-full border border-slate-700 rounded-lg overflow-hidden">
            <thead class="bg-slate-700 text-gray-300 uppercase text-xs">
                <tr>
                    <th class="border border-slate-600 p-2 text-center">ID</th>
                    <th class="border border-slate-600 p-2">Nama</th>
                    <th class="border border-slate-600 p-2">Deskripsi</th>
                    <th class="border border-slate-600 p-2">Tanggal Dibuat</th>
                    <th class="border border-slate-600 p-2 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody id="dataLevel">
                <tr>
                        <td colspan="5" class="text-center p-4 text-gray-500">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <p>Loading data...</p>
                                <p class="text-sm">If this message persists, check your connection or try refreshing the page.</p>
                            </div>
                        </td>
                    </tr>
            </tbody>
        </table>


        {{-- pagination navigasi --}}
        <div class="flex justify-between items-center mt-4">
            <div id="pageInfo" class="text-gray-600 text-sm">
                {{-- Info pagination akan diisi oleh JavaScript --}}
            </div>
            <div class="flex items-center gap-4">
                <select id="perPage" class="border p-2 rounded" onChange="loadDataPaginate(1)">
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <div class="flex gap-2">
                    <button id="prevBtn" onclick="prevPage()"
                    class="bg-gray-300 px-3 py-1 rounded disabled:opacity-50">
                    Back
                    </button>
                    <button id="nextBtn" onclick="nextPage()"
                    class="bg-gray-300 px-3 py-1 rounded disabled:opacity-50">
                    Next
                    </button>
                </div>
                {{-- Kontrol pagination akan diisi oleh JavaScript --}}
            </div>
    </div>

    {{-- Include Modal Tambah --}}
    @include('components.level.modal-add')

    {{-- Include Modal Edit --}}
    @include('components.level.modal-edit')

    {{-- Script --}}
    <script src="{{ asset('js/Level/level.js') }}"></script>
@endsection
