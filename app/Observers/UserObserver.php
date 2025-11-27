<?php

namespace App\Observers;

use App\Models\User;
use App\Services\ActivityLogger;

class UserObserver
{
    protected $activityLogger;

    public function __construct(ActivityLogger $activityLogger)
    {
        $this->activityLogger = $activityLogger;
    }

    public function created(User $user): void
    {
        $this->activityLogger->log('create', $user);
    }

    public function updated(User $user): void
    {
        $this->activityLogger->log('update', $user);
    }

    public function deleted(User $user): void
    {
        $this->activityLogger->log('delete', $user);
    }
}
