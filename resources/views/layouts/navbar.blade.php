<!-- Navigation Bar Component -->
<nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="/dashboard" class="text-white text-2xl font-bold">
                    HRD App
                </a>
            </div>

            <!-- Main Menu -->
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                    <a href="{{ route('dashboard') }}" class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition {{ request()->routeIs('dashboard') ? 'bg-blue-800' : '' }}">
                        Dashboard
                    </a>

                    <!-- HR Management Dropdown -->
                    <div class="relative group">
                        <button class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                            HR Management
                            <span class="ml-2">▼</span>
                        </button>
                        <div class="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('staff.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('staff.*') ? 'bg-blue-50 text-blue-700' : '' }}">Staff</a>
                            <a href="{{ route('level.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('level.*') ? 'bg-blue-50 text-blue-700' : '' }}">Levels</a>
                            <a href="{{ route('user.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('user.*') ? 'bg-blue-50 text-blue-700' : '' }}">Users</a>
                            <a href="{{ route('userprofile.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md {{ request()->routeIs('userprofile.*') ? 'bg-blue-50 text-blue-700' : '' }}">User Profiles</a>
                        </div>
                    </div>

                    <!-- Projects Dropdown -->
                    <div class="relative group">
                        <button class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                            Projects
                            <span class="ml-2">▼</span>
                        </button>
                        <div class="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('proyek.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('proyek.*') ? 'bg-blue-50 text-blue-700' : '' }}">Projects</a>
                            <a href="{{ route('tasks.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('tasks.*') ? 'bg-blue-50 text-blue-700' : '' }}">Tasks</a>
                            <a href="{{ route('kinerja.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md {{ request()->routeIs('kinerja.*') ? 'bg-blue-50 text-blue-700' : '' }}">Performance</a>
                        </div>
                    </div>

                    <!-- Attendance Dropdown -->
                    <div class="relative group">
                        <button class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                            Attendance
                            <span class="ml-2">▼</span>
                        </button>
                        <div class="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('absensi.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('absensi.*') ? 'bg-blue-50 text-blue-700' : '' }}">Attendance</a>
                            <a href="{{ route('overtime.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md {{ request()->routeIs('overtime.*') ? 'bg-blue-50 text-blue-700' : '' }}">Overtime</a>
                        </div>
                    </div>

                    <!-- Payroll Dropdown -->
                    <div class="relative group">
                        <button class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                            Payroll
                            <span class="ml-2">▼</span>
                        </button>
                        <div class="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('payroll.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('payroll.*') ? 'bg-blue-50 text-blue-700' : '' }}">Payroll</a>
                            <a href="{{ route('detailpayroll.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('detailpayroll.*') ? 'bg-blue-50 text-blue-700' : '' }}">Detail Payroll</a>
                            <a href="{{ route('tunjangan.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('tunjangan.*') ? 'bg-blue-50 text-blue-700' : '' }}">Allowances</a>
                            <a href="{{ route('pengurangan.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('pengurangan.*') ? 'bg-blue-50 text-blue-700' : '' }}">Deductions</a>
                            <a href="{{ route('pengurangantelat.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md {{ request()->routeIs('pengurangantelat.*') ? 'bg-blue-50 text-blue-700' : '' }}">Late Deductions</a>
                        </div>
                    </div>

                    <!-- Requests & Communications -->
                    <div class="relative group">
                        <button class="text-gray-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                            More
                            <span class="ml-2">▼</span>
                        </button>
                        <div class="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('permintaan.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('permintaan.*') ? 'bg-blue-50 text-blue-700' : '' }}">Requests</a>
                            <a href="{{ route('pengumuman.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 {{ request()->routeIs('pengumuman.*') ? 'bg-blue-50 text-blue-700' : '' }}">Announcements</a>
                            <a href="{{ route('activitylog.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md {{ request()->routeIs('activitylog.*') ? 'bg-blue-50 text-blue-700' : '' }}">Activity Log</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- User Profile & Logout -->
            <div class="hidden md:block">
                <div class="ml-4 flex items-center md:ml-6">
                    <div class="relative group">
                        <button class="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition">
                            {{ Auth::user()->name }}
                            <span class="ml-2">▼</span>
                        </button>
                        <div class="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-50">
                            <a href="{{ route('userprofile.index') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 first:rounded-t-md {{ request()->routeIs('userprofile.*') ? 'bg-blue-50 text-blue-700' : '' }}">My Profile</a>
                            <form method="POST" action="{{ route('logout') }}" class="block">
                                @csrf
                                <button type="submit" class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 last:rounded-b-md">
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
                    ☰
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="md:hidden hidden bg-blue-700">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/dashboard" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
            <a href="/staff" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Staff</a>
            <a href="/level" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Levels</a>
            <a href="/user" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Users</a>
            <a href="/userprofile" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">User Profiles</a>
            <a href="/proyek" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Projects</a>
            <a href="/tasks" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Tasks</a>
            <a href="/kinerja" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Performance</a>
            <a href="/absensi" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Attendance</a>
            <a href="/overtime" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Overtime</a>
            <a href="/payroll" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Payroll</a>
            <a href="/detailpayroll" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Detail Payroll</a>
            <a href="/tunjangan" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Allowances</a>
            <a href="/pengurangan" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Deductions</a>
            <a href="/pengurangantelat" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Late Deductions</a>
            <a href="/permintaan" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Requests</a>
            <a href="/pengumuman" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Announcements</a>
            <a href="/activitylog" class="text-gray-200 hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">Activity Log</a>
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
