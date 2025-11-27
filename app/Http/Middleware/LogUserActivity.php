<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\ActivityLog;

class LogUserActivity
{
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            ActivityLog::create([
                'user_id' => auth()->id(),
                'action' => $request->method(),
                'description' => $request->path(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'route_name' => $request->route()?->getName(),
                'timestamp' => now()
            ]);
        }

        return $next($request);
    }
}