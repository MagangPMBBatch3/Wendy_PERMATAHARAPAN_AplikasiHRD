<!-- Sidebar Component -->
<aside id="sidebar" class="bg-white shadow-sm w-64 h-screen overflow-y-auto border-r border-gray-200 fixed left-0 top-16 z-30 transition-transform duration-300 ease-in-out">
    <div class="p-5 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span class="bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-bold">HRD</span>
            Navigation
        </h2>
    </div>

    <nav class="mt-4 space-y-2 px-3">
        <!-- Dashboard -->
        <a href="{{ route('dashboard') }}" 
           class="group flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                  {{ request()->routeIs('dashboard') 
                     ? 'bg-gradient-primary text-white shadow-sm' 
                     : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900' }}">
            <svg class="w-5 h-5 flex-shrink-0 
                       {{ request()->routeIs('dashboard') ? 'text-white' : 'text-gray-500 group-hover:text-blue-600' }}" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
        </a>

        <a href="{{ route('pengumuman.index') }}" 
   class="group flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
          {{ request()->routeIs('pengumuman.*') 
             ? 'bg-gradient-secondary text-white' 
             : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
    <svg class="w-4 h-4 flex-shrink-0 
               {{ request()->routeIs('pengumuman.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 12h.01m2.99-2H8a2 2 0 00-2-2V8a2 2 0 00-2-2H4a2 2 0 00-2 2v.111M19 12a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v2m0 0a1 1 0 01-1 1H8a1 1 0 01-1-1v-2" />
    </svg>
    Pengumuman
</a>

<a href="{{ route('activitylog.index') }}" 
   class="group flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
          {{ request()->routeIs('activity-log.*') 
             ? 'bg-gradient-secondary text-white' 
             : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
    <svg class="w-4 h-4 flex-shrink-0 
               {{ request()->routeIs('activity-log.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
    Activity Log
</a>

        @if(Auth::user()->isAdmin() || Auth::user()->isSuperAdmin())
            <!-- Staff Management Section -->
            <div class="space-y-1">
                <button type="button" 
                        class="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        onclick="toggleSection('staff-section')">
                    <span>Staff Management</span>
                    <svg id="staff-section-icon" class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div id="staff-section" class="space-y-1 pl-2 border-l-2 border-gray-100">
                    <a href="{{ route('userprofile.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('userprofile.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('userprofile.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profiles
                    </a>
                    <a href="{{ route('user.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('user.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('user.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM16 16a5 5 0 010 10H4a5 5 0 010-10h12z" />
                        </svg>
                        Users
                    </a>
                    <a href="{{ route('staff.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('staff.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('staff.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 8.646 4 4 0 010-8.646zM12 14.5A6.5 6.5 0 105.5 8" />
                        </svg>
                        Staff
                    </a>
                    <a href="{{ route('absensi.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('absensi.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('absensi.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Attendance
                    </a>
                    <a href="{{ route('permintaan.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('permintaan.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('permintaan.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Requests
                    </a>
                    <a href="{{ route('kinerja.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('kinerja.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('kinerja.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Performance
                    </a>
                    <a href="{{ route('level.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('level.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('level.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                        Levels
                    </a>
                </div>
            </div>

            <!-- Project Section -->
            <div class="space-y-1">
                <button type="button" 
                        class="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        onclick="toggleSection('project-section')">
                    <span>Projects</span>
                    <svg id="project-section-icon" class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div id="project-section" class="space-y-1 pl-2 border-l-2 border-gray-100">
                    <a href="{{ route('proyek.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('proyek.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('proyek.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        Projects
                    </a>
                    <a href="{{ route('tasks.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('tasks.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('tasks.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Tasks
                    </a>
                    <a href="{{ route('overtime.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('overtime.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('overtime.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Overtime
                    </a>
                </div>
            </div>

            <!-- Payroll Section -->
            <div class="space-y-1">
                <button type="button" 
                        class="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        onclick="toggleSection('payroll-section')">
                    <span>Payroll</span>
                    <svg id="payroll-section-icon" class="w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <div id="payroll-section" class="space-y-1 pl-2 border-l-2 border-gray-100">
                    <a href="{{ route('payroll.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('payroll.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('payroll.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Payroll
                    </a>
                    <a href="{{ route('detailpayroll.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('detailpayroll.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('detailpayroll.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Details
                    </a>
                    <a href="{{ route('tunjangan.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('tunjangan.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('tunjangan.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Allowances
                    </a>
                    <a href="{{ route('pengurangan.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('pengurangan.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('pengurangan.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                        Deductions
                    </a>
                    <a href="{{ route('pengurangantelat.index') }}" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              {{ request()->routeIs('pengurangantelat.*') 
                                 ? 'bg-gradient-secondary text-white' 
                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }}">
                        <svg class="w-4 h-4 flex-shrink-0 
                                   {{ request()->routeIs('pengurangantelat.*') ? 'text-white' : 'text-gray-400 group-hover:text-purple-600' }}" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Late Penalty
                    </a>
                </div>
            </div>
        @endif

        @if(Auth::user()->isStaff())
            <!-- My Work Section -->
            <div class="space-y-1">
                <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    My Work
                </div>
                <div class="space-y-1 pl-2">
                    <a href="#" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <svg class="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-teal-600" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Tasks
                    </a>
                    <a href="#" 
                       class="group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all
                              text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <svg class="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-teal-600" 
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        My Payroll
                    </a>
                </div>
            </div>
        @endif
    </nav>
</aside>

<script>
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const icon = document.getElementById(`${sectionId}-icon`);
    
    if (section && icon) {
        const isExpanded = section.classList.contains('hidden');
        section.classList.toggle('hidden', !isExpanded);
        icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        
        // Optional: Save state in localStorage
        localStorage.setItem(`${sectionId}-expanded`, isExpanded);
    }
}

// Initialize sections on load (expand by default or from localStorage)
document.addEventListener('DOMContentLoaded', function() {
    const sections = ['staff-section', 'project-section', 'payroll-section'];
    
    sections.forEach(id => {
        const saved = localStorage.getItem(`${id}-expanded`);
        const section = document.getElementById(id);
        const icon = document.getElementById(`${id}-icon`);
        
        if (section && icon) {
            const shouldExpand = saved === 'true' || saved === null; // Default: expanded
            section.classList.toggle('hidden', !shouldExpand);
            icon.style.transform = shouldExpand ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    });
});
</script>

<!-- Optional: Mobile sidebar overlay & toggle -->
<div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-20 hidden md:hidden" style="top: 4rem;"></div>

<script>
// Sidebar toggle for mobile (works with your #sidebar-toggle button in navbar)
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle');
    
    function toggleSidebar() {
        const isHidden = sidebar.classList.contains('-translate-x-full');
        sidebar.classList.toggle('-translate-x-full', !isHidden);
        overlay.classList.toggle('hidden', isHidden);
        document.body.classList.toggle('overflow-hidden', !isHidden); // Prevent body scroll
    }
    
    if (toggleBtn && sidebar && overlay) {
        toggleBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }
});
</script>

<style>
/* Mobile: slide-in sidebar */
#sidebar {
    @apply transform translate-x-0 md:translate-x-0;
}
#sidebar.-translate-x-full {
    @apply -translate-x-full;
}
@media (max-width: 768px) {
    #sidebar {
        @apply -translate-x-full;
    }
}
</style>