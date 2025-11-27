{{-- Modal Add Kinerja --}}
<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
  <div class="bg-indigo-900/95 border border-indigo-700 shadow-2xl rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="bg-indigo-800 px-6 py-4 border-b border-indigo-700">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Kinerja
      </h2>
    </div>

    <!-- Scrollable Content -->
    <div class="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
      <!-- Staff -->
      <div class="space-y-2">
        <label for="addStaffId" class="block text-sm font-medium text-gray-200">
          Staff <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <select
            id="addStaffId"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
            <option value="">Pilih Staff</option>
          </select>
        </div>
      </div>

      <!-- Proyek -->
      <div class="space-y-2">
        <label for="addProyekId" class="block text-sm font-medium text-gray-200">
          Proyek <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <select
            id="addProyekId"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
            <option value="">Pilih Proyek</option>
          </select>
        </div>
      </div>

      <!-- Points -->
      <div class="space-y-2">
        <label for="addPoints" class="block text-sm font-medium text-gray-200">
          Points <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <input
            type="number"
            id="addPoints"
            required
            step="0.01"
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan points"
          >
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label for="addDescription" class="block text-sm font-medium text-gray-200">
          Deskripsi
        </label>
        <div class="relative">
          <div class="absolute top-3 left-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <textarea
            id="addDescription"
            rows="3"
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Masukkan deskripsi kinerja"
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

      <!-- User dropdown -->
<select id="addUserId" required class="w-full ...">
    <option value="">-- Pilih User --</option>
    @foreach($users as $user)
        <option value="{{ $user->id }}">{{ $user->name }}</option>
    @endforeach
</select>

<!-- Staff dropdown -->
<select id="addStaffId" required class="w-full ...">
    <option value="">-- Pilih Staff --</option>
    @foreach($staff as $s)
        <option value="{{ $s->id }}">{{ $s->nama }}</option>
    @endforeach
</select>

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
          onclick="createKinerja(); return false;"
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
