@extends('layouts.app')

@section('title', 'Pengumuman')

@section('content')
<div class="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen p-4 sm:p-6">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 class="text-3xl md:text-4xl font-bold text-white">Pengumuman</h1>
                <p class="text-blue-100 mt-2">Informasi penting untuk seluruh karyawan</p>
            </div>
            <button 
                onclick="crud.openCreate()" 
                class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Pengumuman
            </button>
        </div>

        <!-- Search -->
        <div class="mb-8">
            <div class="relative max-w-md">
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                    type="text" 
                    id="searchInput" 
                    placeholder="Cari judul atau isi pengumuman..." 
                    class="w-full bg-white/10 backdrop-blur-sm text-white placeholder-white/70 border border-white/20 pl-12 pr-4 py-4 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all">
            </div>
        </div>

        <!-- Announcements Grid -->
        <div id="announcements-container" class="space-y-6">
            <!-- Skeleton loader -->
            <div class="space-y-4">
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
                    <div class="h-6 bg-white/20 rounded w-3/4 mb-3"></div>
                    <div class="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div class="h-4 bg-white/10 rounded w-5/6 mb-4"></div>
                    <div class="flex justify-between items-center">
                        <div class="h-5 bg-white/20 rounded w-32"></div>
                        <div class="h-8 bg-white/20 rounded w-20"></div>
                    </div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-pulse">
                    <div class="h-6 bg-white/20 rounded w-1/2 mb-3"></div>
                    <div class="h-4 bg-white/10 rounded w-full mb-2"></div>
                    <div class="h-4 bg-white/10 rounded w-4/5 mb-4"></div>
                    <div class="flex justify-between items-center">
                        <div class="h-5 bg-white/20 rounded w-24"></div>
                        <div class="h-8 bg-white/20 rounded w-20"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div id="empty-state" class="hidden flex flex-col items-center justify-center py-20 text-center">
            <div class="bg-white/10 rounded-full p-4 mb-6">
                <svg class="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 12h.01m2.99-2H8a2 2 0 00-2-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v.111M19 12a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v2m0 0a1 1 0 01-1 1H8a1 1 0 01-1-1v-2" />
                </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Tidak ada pengumuman</h3>
            <p class="text-white/70 max-w-md mb-6">Belum ada pengumuman yang diposting. Tambahkan pengumuman baru untuk berbagi informasi penting.</p>
            <button 
                onclick="crud.openCreate()" 
                class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium">
                Buat Pengumuman Pertama
            </button>
        </div>

        <!-- Pagination -->
        <div id="pagination-container" class="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div id="pageInfo" class="text-white/80 text-sm font-medium">
                <!-- Will be populated by JS -->
            </div>
            <div class="flex gap-3">
                <button 
                    id="prevPageBtn"
                    disabled
                    class="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition">
                    ← Sebelumnya
                </button>
                <button 
                    id="nextPageBtn"
                    disabled
                    class="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition">
                    Selanjutnya →
                </button>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div id="formModal" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-5">
                <div class="flex justify-between items-center">
                    <h2 id="modalTitle" class="text-xl font-bold text-white">Tambah Pengumuman Baru</h2>
                    <button 
                        onclick="document.getElementById('formModal').classList.add('hidden')" 
                        class="text-white hover:text-cyan-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Modal Body -->
            <div class="p-6">
                <form id="crud-form" class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Judul Pengumuman <span class="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            id="judul" 
                            name="judul" 
                            required 
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Isi Pengumuman <span class="text-red-500">*</span></label>
                        <textarea 
                            id="konten" 
                            name="konten" 
                            rows="5"
                            required
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"></textarea>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button 
                            type="submit" 
                            class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition">
                            Simpan Pengumuman
                        </button>
                        <button 
                            type="button" 
                            onclick="document.getElementById('formModal').classList.add('hidden')" 
                            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl transition">
                            Batal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

 {{-- Include Modal Tambah --}}
        @include('components.pengumuman.modal-add')

        {{-- Include Modal Edit --}}
        @include('components.pengumuman.modal-edit')

        {{-- Script --}}
        <script src="{{ asset('js/Pengumuman/pengumuman.js') }}"></script>
        <script src="{{ asset('js/Pengumuman/pengumuman-create.js') }}"></script>
        <script src="{{ asset('js/Pengumuman/pengumuman-edit.js') }}"></script>
    </div>

<script>
// Update search to trigger on input (no need for separate button)
document.getElementById('searchInput')?.addEventListener('input', function() {
    window.crud && crud.loadData({ page: 1 });
});
</script>
@endsection