<?php

namespace App\Observers;

use App\Models\Overtime;
use App\Services\ActivityLogger;

class OvertimeObserver
{
    protected $activityLogger;

    public function __construct(ActivityLogger $activityLogger)
    {
        $this->activityLogger = $activityLogger;
    }

    public function created(Overtime $overtime): void
    {
        $this->activityLogger->log('create', $overtime);
    }

    public function updated(Overtime $overtime): void
    {
        $this->activityLogger->log('update', $overtime);
    }

    public function deleted(Overtime $overtime): void
    {
        $this->activityLogger->log('delete', $overtime);
    }
}
