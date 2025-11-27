<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-5">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">Tambah Level Baru</h2>
                <button 
                    type="button" 
                    onclick="closeAddModal()" 
                    class="text-white hover:text-cyan-100 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Form -->
        <div class="p-6 space-y-5">
            <div>
                <label for="addNama" class="block text-sm font-medium text-gray-700 mb-2">
                    Nama Level <span class="text-red-500">*</span>
                </label>
                <input 
                    type="text" 
                    id="addNama" 
                    required 
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition">
            </div>

            <div>
                <label for="addDeskripsi" class="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                </label>
                <textarea 
                    id="addDeskripsi" 
                    rows="3"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"></textarea>
            </div>

            <div class="flex gap-3 pt-2">
                <button 
                    type="button" 
                    onclick="createLevel(); return false;"
                    class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition">
                    Simpan Level
                </button>
                <button 
                    type="button" 
                    onclick="closeAddModal()"
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl transition">
                    Batal
                </button>
            </div>
        </div>
    </div>
</div>