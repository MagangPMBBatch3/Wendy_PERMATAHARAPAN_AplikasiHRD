<!-- Navigation Bar Component -->
<nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg fixed w-full z-30 top-0 left-0 right-0 h-16">
    <div class="w-full h-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
                <button id="sidebar-toggle" class="text-white mr-4 md:hidden">
                    ☰
                </button>
            </div>
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="/dashboard" class="text-white text-2xl font-bold">
                    HRD App
                </a>
            </div>

            <!-- Empty space for center alignment -->
            <div class="flex-1"></div>

            <!-- User Profile & Settings -->
            <div class="ml-4 flex items-center md:ml-6">
                <div class="relative group">
                    <button class="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        {{ Auth::user()->name }}
                        <span class="ml-2">▼</span>
                    </button>
                        <div class="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('userprofile.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('userprofile.*') ? 'bg-blue-50 text-blue-700' : '' }}">
                                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                My Profile
                            </a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md">
                                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                Settings
                            </a>
                            <form method="POST" action="{{ route('logout') }}" class="block">
                                @csrf
                                <button type="submit" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:text-white transition text-xl" id="mobile-menu-btn">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile User Menu -->
    <div id="mobile-menu" class="md:hidden hidden bg-blue-700 border-t border-blue-600">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="{{ route('userprofile.index') }}" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-sm font-medium">My Profile</a>
            <a href="#" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-sm font-medium">Settings</a>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="text-gray-200 hover:bg-blue-600 block w-full text-left px-3 py-2 rounded-md text-sm font-medium">Logout</button>
            </form>
        </div>
    </div>
</nav>

<script>
// Safe mobile menu toggle: attach only if elements exist
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', function () {
            menu.classList.toggle('hidden');
        });
    }
});
</script>