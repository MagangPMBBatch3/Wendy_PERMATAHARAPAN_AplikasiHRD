{{-- Modal Edit Pengurangan Telat --}}
<div id="editModal" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
  <div class="bg-indigo-900/95 border border-indigo-700 shadow-2xl rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="bg-indigo-800 px-6 py-4 border-b border-indigo-700">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Pengurangan Telat
      </h2>
    </div>

    <!-- Scrollable Content -->
    <div class="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
      <input type="hidden" id="editId">

      <!-- Staff -->
      <div class="space-y-2">
        <label for="editStaffId" class="block text-sm font-medium text-gray-200">
          Staff <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <select
            id="editStaffId"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
            <option value="">Pilih Staff</option>
          </select>
        </div>
      </div>

      <!-- Jumlah -->
      <div class="space-y-2">
        <label for="editJumlah" class="block text-sm font-medium text-gray-200">
          Jumlah <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <input
            type="number"
            id="editJumlah"
            required
            step="0.01"
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan jumlah pengurangan"
          >
        </div>
      </div>

      <!-- Keterangan -->
      <div class="space-y-2">
        <label for="editKeterangan" class="block text-sm font-medium text-gray-200">
          Keterangan
        </label>
        <div class="relative">
          <div class="absolute top-3 left-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <textarea
            id="editKeterangan"
            rows="3"
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Masukkan keterangan pengurangan"
          ></textarea>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="pt-2 flex gap-3 justify-end">
        <button
          type="button"
          onclick="closeEditModal()"
          class="px-5 py-2.5 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Batal
        </button>
        <button
          type="button"
          onclick="updatePenguranganTelat(); return false;"
          class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
        >
          <span class="flex items-center gap-1">
            Update
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
