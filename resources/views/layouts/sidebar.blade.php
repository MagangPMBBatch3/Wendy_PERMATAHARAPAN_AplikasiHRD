<div class="bg-white shadow-sm w-64 min-h-screen border-r border-gray-200">
    <div class="p-6">
        <h2 class="text-lg font-semibold text-gray-800">Navigation</h2>
    </div>

    <nav class="mt-6">
        <div class="px-6">
            <a href="{{ route('dashboard') }}" class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gradient-primary hover:text-white transition-colors duration-200 {{ request()->routeIs('dashboard') ? 'bg-gradient-primary text-white' : '' }}">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
                </svg>
                Dashboard
            </a>
        </div>

        @if(Auth::user()->isAdmin() || Auth::user()->isSuperAdmin())
        <div class="mt-8">
            <h3 class="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
            <div class="mt-4">
                <a href="{{ route('userprofile.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('userprofile.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    User Profiles
                </a>
                <a href="{{ route('tasks.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('tasks.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Tasks
                </a>
                <a href="{{ route('permintaan.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('permintaan.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Permintaan
                </a>
                {{-- TODO: Implement remaining modules --}}
                <a href="{{ route('pengurangan.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('pengurangan.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Pengurangan
                </a>
                <a href="{{ route('tunjangan.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('tunjangan.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Tunjangan
                </a>
                <a href="{{ route('overtime.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('overtime.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Overtime
                </a>
                <a href="{{ route('detailpayroll.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('detailpayroll.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Detail Payroll
                </a>
                <a href="{{ route('pengurangantelat.index') }}" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200 {{ request()->routeIs('pengurangantelat.*') ? 'bg-gradient-secondary text-white' : '' }}">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    Pengurangan Telat
                </a> --}}
            </div>
        </div>
        @endif

        @if(Auth::user()->isStaff())
        <div class="mt-8">
            <h3 class="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">My Work</h3>
            <div class="mt-4">
                <a href="#" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-accent hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    My Tasks
                </a>
                <a href="#" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-accent hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    My Payroll
                </a>
            </div>
        </div>
        @endif
    </nav>
</div>
