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

        @if(Auth::user()->isAdmin())
        <div class="mt-8">
            <h3 class="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
            <div class="mt-4">
                <a href="#" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                    Staff
                </a>
                <a href="#" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    Projects
                </a>
                <a href="#" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Tasks
                </a>
                <a href="#" class="flex items-center px-6 py-2 text-gray-700 rounded-lg hover:bg-gradient-secondary hover:text-white transition-colors duration-200">
                    <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                    Payroll
                </a>
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
