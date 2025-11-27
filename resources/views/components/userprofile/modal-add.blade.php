<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
  <div class="bg-indigo-900/95 border border-indigo-700 shadow-2xl rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">

    <!-- Header -->
    <div class="bg-indigo-800 px-6 py-4 border-b border-indigo-700">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah User Profile
      </h2>
    </div>

    <!-- Scrollable Content -->
    <div class="p-6 space-y-5 overflow-y-auto max-h-[60vh]">

      <!-- Nama Lengkap -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-200">
          Nama Lengkap <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input type="text" id="addNamaLengkap" class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500" placeholder="Masukkan nama lengkap" required>
        </div>
      </div>
<div>
    <label class="block text-sm font-medium text-gray-200 mb-2">Foto Profil</label>
    <input type="file" id="addFoto" accept="image/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
    <div id="addFotoPreviewContainer" class="mt-2 hidden">
        <img id="addFotoPreview" class="w-16 h-16 rounded-full object-cover border-2 border-white shadow">
    </div>
</div>
      <!-- NRP -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-200">
          NRP
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m2 0a8 8 0 11-16 0 8 8 0 0116 0z" />
            </svg>
          </div>
          <input type="text" id="addNrp" class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500" placeholder="Masukkan NRP">
        </div>
      </div>

      <!-- Alamat -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-200">
          Alamat
        </label>
        <textarea id="addAlamat" rows="3" class="w-full pl-4 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:ring-2 focus:ring-purple-500" placeholder="Masukkan alamat lengkap"></textarea>
      </div>

      <!-- Footer Buttons -->
      <div class="pt-2 flex gap-3 justify-end">
        <button type="button" onclick="closeAddModal()" class="px-5 py-2.5 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all">
          Batal
        </button>
        <button type="button" onclick="createUserProfile(); return false;" class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all">
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
