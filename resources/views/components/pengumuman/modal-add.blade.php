{{-- Modal Add Pengumuman --}}
<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
  <div class="bg-indigo-900/95 border border-indigo-700 shadow-2xl rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="bg-indigo-800 px-6 py-4 border-b border-indigo-700">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Pengumuman
      </h2>
    </div>

    <!-- Scrollable Content -->
    <div class="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
      <!-- Title -->
      <div class="space-y-2">
        <label for="addTitle" class="block text-sm font-medium text-gray-200">
          Judul <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <input
            type="text"
            id="addTitle"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan judul pengumuman"
          >
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-2">
        <label for="addContent" class="block text-sm font-medium text-gray-200">
          Konten <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute top-3 left-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <textarea
            id="addContent"
            rows="4"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Masukkan konten pengumuman"
          ></textarea>
        </div>
      </div>

      <!-- Date -->
      <div class="space-y-2">
        <label for="addDate" class="block text-sm font-medium text-gray-200">
          Tanggal <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="date"
            id="addDate"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="pt-2 flex gap-3 justify-end">
        <button
          type="button"
          onclick="closeAddModal()"
          class="px-5 py-2.5 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Batal
        </button>
        <button
          type="button"
          onclick="createPengumuman(); return false;"
          class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        >
          <span class="flex items-center gap-1">
            Simpan
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
