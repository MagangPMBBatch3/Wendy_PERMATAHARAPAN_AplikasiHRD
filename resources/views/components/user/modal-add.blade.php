<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-indigo-900 p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4 text-white">Tambah User</h2>
        <div class="space-y-4">
            <div>
                <label class="block text-gray-100 mb-1">Nama <span class="text-red-400">*</span></label>
                <input type="text" id="addName" required 
                       class="w-full p-2 bg-indigo-800 text-white rounded focus:ring-2 focus:ring-purple-500 focus:outline-none transition">
            </div>
            <div>
                <label class="block text-gray-300 mb-1">Email</label>
                <input type="email" id="addEmail" required class="w-full p-2 bg-slate-700 text-white rounded">
            </div>
            <div>
                <label class="block text-gray-300 mb-1">Password</label>
                <input type="password" id="addPassword" required class="w-full p-2 bg-slate-700 text-white rounded">
            </div>
            <div class="flex gap-4 justify-end pt-4">
                <button type="button" onclick="closeAddModal()" 
                        class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition hover:scale-105">
                    Batal
                </button>
                <button type="button" onclick="createUser(); return false;" 
                        class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition hover:scale-105">
                    Simpan
                </button>
            </div>
        </div>
    </div>
</div>