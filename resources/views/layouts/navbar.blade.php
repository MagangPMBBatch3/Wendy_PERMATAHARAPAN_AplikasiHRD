<nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-gradient">HRD App</h1>
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <!-- Navigation Links for Admin/SuperAdmin -->
                @if(Auth::user()->isAdmin() || Auth::user()->isSuperAdmin())
                <div class="hidden md:flex items-center space-x-4">
                    <a href="{{ route('dashboard') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('dashboard') ? 'bg-gray-100' : '' }}">Dashboard</a>
                    <a href="{{ route('userprofile.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('userprofile.*') ? 'bg-gray-100' : '' }}">User Profiles</a>
                    <a href="{{ route('tasks.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('tasks.*') ? 'bg-gray-100' : '' }}">Tasks</a>
                    <a href="{{ route('permintaan.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('permintaan.*') ? 'bg-gray-100' : '' }}">Permintaan</a>
                    {{-- TODO: Add remaining table links when implemented --}}
                    <a href="{{ route('pengurangan.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('pengurangan.*') ? 'bg-gray-100' : '' }}">Pengurangan</a>
                    <a href="{{ route('tunjangan.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('tunjangan.*') ? 'bg-gray-100' : '' }}">Tunjangan</a>
                    <a href="{{ route('overtime.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('overtime.*') ? 'bg-gray-100' : '' }}">Overtime</a>
                    <a href="{{ route('detailpayroll.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('detailpayroll.*') ? 'bg-gray-100' : '' }}">Detail Payroll</a>
                    <a href="{{ route('pengurangantelat.index') }}" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium {{ request()->routeIs('pengurangantelat.*') ? 'bg-gray-100' : '' }}">Pengurangan Telat</a> 
                </div>
                @endif

                <!-- User Menu -->
                <div class="relative" x-data="{ open: false }">
                    <button @click="open = !open" class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
                        <div class="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                            {{ substr(Auth::user()->name, 0, 1) }}
                        </div>
                        <span class="text-sm font-medium">{{ Auth::user()->name }}</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>

                    <div x-show="open" @click.away="open = false" x-transition class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        <div class="border-t border-gray-100"></div>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>
