@extends('layouts.app')

@section('content')
<div class="space-y-6">
    <!-- Welcome Banner -->
    <div class="bg-gradient-primary rounded-2xl shadow-lg p-6 md:p-8 text-white">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold mb-1">Welcome back, <span class="font-semibold">{{ Auth::user()->name }}</span>!</h1>
                <p class="text-blue-100 opacity-90">Here's what's happening with your HRD system today.</p>
            </div>
            <div class="shrink-0 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <span class="inline-flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ now()->format('l, j F Y') }}
                </span>
            </div>
        </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Total Staff -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-start">
                <div class="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                </div>
                <div class="ml-4">
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Staff</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ $total_staff }}</p>
                </div>
            </div>
        </div>

        <!-- Total Projects -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-start">
                <div class="flex-shrink-0 p-3 bg-green-50 rounded-xl">
                    <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                </div>
                <div class="ml-4">
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Projects</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ $total_projects }}</p>
                </div>
            </div>
        </div>

        <!-- Total Tasks -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-start">
                <div class="flex-shrink-0 p-3 bg-yellow-50 rounded-xl">
                    <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                </div>
                <div class="ml-4">
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tasks</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ $total_tasks }}</p>
                </div>
            </div>
        </div>

        <!-- Pending Payrolls -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-start">
                <div class="flex-shrink-0 p-3 bg-red-50 rounded-xl">
                    <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                </div>
                <div class="ml-4">
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Payrolls</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">{{ $pending_payrolls }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Staff-Specific Stats -->
    @if(Auth::user()->isStaff())
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">My Tasks</p>
                    <p class="text-xl font-bold text-gray-900 mt-1">{{ $my_tasks ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">My Projects</p>
                    <p class="text-xl font-bold text-gray-900 mt-1">{{ $my_projects ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                </div>
                <div>
                    <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">My Payrolls</p>
                    <p class="text-xl font-bold text-gray-900 mt-1">{{ $my_payrolls ?? 0 }}</p>
                </div>
            </div>
        </div>
    </div>
    @endif

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Recent Activity
            </h3>
        </div>
        <div class="p-6">
            <div class="space-y-4">
                @forelse($recentActivities ?? [] as $activity)
                    @php
                        $type = $activity->type ?? ($activity['type'] ?? 'info');
                        $dot = match($type) {
                            'staff' => 'bg-blue-500',
                            'project' => 'bg-green-500',
                            'payroll' => 'bg-yellow-500',
                            'error' => 'bg-red-500',
                            default => 'bg-gray-400',
                        };
                        $message = $activity->message ?? ($activity['message'] ?? 'Activity');
                        $url = $activity->url ?? ($activity['url'] ?? null);
                        $created = $activity->created_at ?? ($activity['created_at'] ?? null);
                    @endphp

                    <div class="flex items-start justify-between group">
                        <div class="flex items-start space-x-3">
                            <div class="mt-1.5 w-2 h-2 {{ $dot }} rounded-full flex-shrink-0"></div>
                            <div class="text-sm text-gray-700 max-w-[80%]">
                                @if($url)
                                    <a href="{{ $url }}" class="hover:text-indigo-600 hover:underline font-medium transition-colors">
                                        {{ $message }}
                                    </a>
                                @else
                                    {{ $message }}
                                @endif
                            </div>
                        </div>

                        <time class="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                            @if($created)
                                {{ \Carbon\Carbon::parse($created)->diffForHumans() }}
                            @endif
                        </time>
                    </div>
                @empty
                    <div class="py-10 flex flex-col items-center justify-center text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto opacity-40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.334 0-4.334-1.343-5.334-3.291m0 0A7.961 7.961 0 005 12c0-2.334 1.343-4.334 3.291-5.334m10.676 10.676L21 21" />
                        </svg>
                        <p class="font-medium">No recent activity</p>
                        <p class="text-sm mt-1">Actions will appear here as they happen.</p>
                    </div>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection