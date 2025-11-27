@extends('layouts.app')

@section('title', 'User Profile')

@section('content')
    <div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 rounded-2xl shadow-2xl w-full min-h-screen">
        <h1 class="text-3xl font-bold mb-6 text-white text-center">Data User Profile</h1>

        {{-- Tombol Tambah & Pencarian --}}
        <div class="flex justify-between mb-6">
            <input
                type="text"
                id="searchInput"
                placeholder="Cari ID, Nama, atau NRP..."
                class="bg-white/10 backdrop-blur-sm text-white placeholder-white/70 border border-white/20 p-3 rounded-xl w-64 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
                oninput="searchUser()">

            <button onclick="openAddModal()"
                class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                Tambah User Profile
            </button>
        </div>

        {{-- Tabel Data --}}
        <div class="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl">
            <table class="w-full">
                <thead class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <tr>
                        <th class="p-4 text-center font-semibold">No</th>
                        <th class="p-4 text-left font-semibold">Foto</th>
                        <th class="p-4 text-left font-semibold">Nama Lengkap</th>
                        <th class="p-4 text-left font-semibold">NRP</th>
                        <th class="p-4 text-left font-semibold">User ID</th>
                        <th class="p-4 text-left font-semibold">Staff ID</th>
                        <th class="p-4 text-left font-semibold">Alamat</th>
                        <th class="p-4 text-center font-semibold">Aksi</th>
                    </tr>
                </thead>
                <tbody id="dataUser" class="text-white">
                    <tr>
                        <td colspan="7" class="text-center p-8">
                            <div class="flex flex-col items-center">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
                                <p class="text-lg font-medium">Loading data...</p>
                                <p class="text-sm text-white/70 mt-2">If this message persists, check your connection or try refreshing the page.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        {{-- pagination navigasi --}}
        <div class="flex justify-between items-center mt-6">
            <div id="pageInfo" class="text-white/80 text-sm font-medium">
                {{-- Info pagination akan diisi oleh JavaScript --}}
            </div>
            <div class="flex items-center gap-4">
                <select id="perPage" class="bg-white/10 backdrop-blur-sm text-white border border-white/20 p-2 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none" onChange="loadDataPaginate(1)">
                    <option value="5" class="text-black">5</option>
                    <option value="10" selected class="text-black">10</option>
                    <option value="25" class="text-black">25</option>
                    <option value="50" class="text-black">50</option>
                    <option value="100" class="text-black">100</option>
                </select>

                <div class="flex gap-2">
                    <button id="prevBtn" onclick="prevPage()"
                    class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-all duration-300">
                    Back
                    </button>
                    <button id="nextBtn" onclick="nextPage()"
                    class="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg disabled:opacity-50 transition-all duration-300">
                    Next
                    </button>
                </div>
            </div>
        </div>

        {{-- Include Modal Tambah --}}
        @include('components.userprofile.modal-add')

        {{-- Include Modal Edit --}}
        @include('components.userprofile.modal-edit')

        {{-- Script --}}
        <script src="{{ asset('js/UserProfile/userprofile.js') }}"></script>
        <script src="{{ asset('js/UserProfile/userprofile-create.js') }}"></script>
        <script src="{{ asset('js/UserProfile/userprofile-edit.js') }}"></script>
@endsection