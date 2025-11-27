<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Logout;
use App\Services\ActivityLogger;

class LogoutListener
{
    protected $activityLogger;

    public function __construct(ActivityLogger $activityLogger)
    {
        $this->activityLogger = $activityLogger;
    }

    public function handle(Logout $event): void
    {
        if ($event->user) {
            $this->activityLogger->log(
                'logout',
                null,
                "User {$event->user->name} logged out",
                $event->user->id
            );
        }
    }
}
