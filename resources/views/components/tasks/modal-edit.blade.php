{{-- Modal Edit Tasks --}}
<div id="editModal" class="hidden fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300">
  <div class="bg-indigo-900/95 border border-indigo-700 shadow-2xl rounded-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="bg-indigo-800 px-6 py-4 border-b border-indigo-700">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Task
      </h2>
    </div>

    <!-- Scrollable Content -->
    <div class="p-6 space-y-5 overflow-y-auto max-h-[60vh]">
      <input type="hidden" id="editId">

      <!-- Title -->
      <div class="space-y-2">
        <label for="editTitle" class="block text-sm font-medium text-gray-200">
          Title <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <input
            type="text"
            id="editTitle"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="Masukkan judul task"
          >
        </div>
      </div>

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

      <!-- Proyek -->
      <div class="space-y-2">
        <label for="editProyekId" class="block text-sm font-medium text-gray-200">
          Proyek <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <select
            id="editProyekId"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
            <option value="">Pilih Proyek</option>
          </select>
        </div>
      </div>

      <!-- Due Date -->
      <div class="space-y-2">
        <label for="editDueDate" class="block text-sm font-medium text-gray-200">
          Due Date <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="date"
            id="editDueDate"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
        </div>
      </div>

      <!-- Priority -->
      <div class="space-y-2">
        <label for="editPriority" class="block text-sm font-medium text-gray-200">
          Priority <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <select
            id="editPriority"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
            <option value="">Pilih Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <!-- Status -->
      <div class="space-y-2">
        <label for="editStatus" class="block text-sm font-medium text-gray-200">
          Status <span class="text-red-400 ml-1">*</span>
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <select
            id="editStatus"
            required
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200">
            <option value="">Pilih Status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label for="editDescription" class="block text-sm font-medium text-gray-200">
          Description
        </label>
        <div class="relative">
          <div class="absolute top-3 left-3 pointer-events-none text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <textarea
            id="editDescription"
            rows="3"
            class="w-full pl-10 pr-4 py-3 bg-slate-800/70 text-white placeholder-gray-400 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Masukkan deskripsi task"
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
          onclick="updateTasks(); return false;"
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
