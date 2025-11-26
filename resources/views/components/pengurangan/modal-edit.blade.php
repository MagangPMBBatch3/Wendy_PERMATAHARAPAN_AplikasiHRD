<div id="modalEdit" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-96 max-h-[90vh] overflow-auto">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Edit Deduction</h2>
            <button onclick="closeEditModal()" class="text-2xl">&times;</button>
        </div>
        <form id="formEdit" class="space-y-6">
            <input type="hidden" id="edit_id" name="id" />
            <div>
                <label for="edit_staff_id" class="block text-sm font-medium text-gray-700">Staff <span class="text-red-500">*</span></label>
                <select id="edit_staff_id" name="staff_id" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the staff member for this deduction</p>
            </div>
            <div>
                <label for="edit_dt_payroll_id" class="block text-sm font-medium text-gray-700">
                    Payroll Period <span class="text-red-500">*</span>
                </label>
                <select id="edit_dt_payroll_id" name="dt_payroll_id" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </select>
                <p class="mt-1 text-sm text-gray-500">Select the payroll period for this deduction</p>
            </div>
            <div>
                <label for="edit_tanggal" class="block text-sm font-medium text-gray-700">Date <span class="text-red-500">*</span></label>
                <input type="date" id="edit_tanggal" name="tanggal" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <p class="mt-1 text-sm text-gray-500">Date of the deduction</p>
            </div>
            <div>
                <label for="edit_jumlah" class="block text-sm font-medium text-gray-700">Amount <span class="text-red-500">*</span></label>
                <div class="mt-1 relative rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span class="text-gray-500 sm:text-sm">Rp</span>
                    </div>
                    <input type="number" id="edit_jumlah" name="jumlah" step="0.01" min="0" required placeholder="0.00"
                        class="pl-12 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                </div>
                <p class="mt-1 text-sm text-gray-500">Deduction amount in Rupiah</p>
            </div>
            <div>
                <label for="edit_keterangan" class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
                <textarea id="edit_keterangan" name="keterangan" rows="4" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide details about this deduction..."></textarea>
                <p class="mt-1 text-sm text-gray-500">Detailed description of the deduction</p>
            </div>
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button type="button" onclick="closeEditModal()" class="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
                <button type="submit" id="submitEditBtn" class="bg-gradient-primary text-white px-6 py-2 rounded-md hover:bg-gradient-secondary flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Update Deduction
                </button>
            </div>
        </form>
    </div>
</div>
