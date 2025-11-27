<?php

namespace App\Observers;

use App\Models\Pengurangan;
use App\Services\ActivityLogger;

class PenguranganObserver
{
    protected $activityLogger;

    public function __construct(ActivityLogger $activityLogger)
    {
        $this->activityLogger = $activityLogger;
    }

    public function created(Pengurangan $pengurangan): void
    {
        $this->activityLogger->log('create', $pengurangan);
    }

    public function updated(Pengurangan $pengurangan): void
    {
        $this->activityLogger->log('update', $pengurangan);
    }

    public function deleted(Pengurangan $pengurangan): void
    {
        $this->activityLogger->log('delete', $pengurangan);
    }
}
