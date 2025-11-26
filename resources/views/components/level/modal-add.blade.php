<div id="modalAdd" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-slate-800 p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4 text-white">Tambah Level</h2>
        <form id="addForm">
            <div class="mb-4">
                <label class="block text-gray-300">Name</label>
                <input type="text" id="addName" class="w-full p-2 bg-slate-700 text-white rounded" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-300">Description</label>
                <textarea id="addDescription" class="w-full p-2 bg-slate-700 text-white rounded"></textarea>
            </div>
            <div class="flex justify-end gap-2">
                <button type="button" onclick="closeAddModal()" class="bg-gray-500 text-white px-4 py-2 rounded">Batal</button>
                <button type="button" onclick="createLevel()" class="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
            </div>
        </form>
    </div>
</div>
