<?php

namespace App\GraphQL\ActivityLog\Mutations;

use App\Models\ActivityLog;

class ActivityLogMutation
{
    public function createActivityLog($_, array $args)
    {
        return ActivityLog::create($args);
    }

    public function updateActivityLog($_, array $args)
    {
        $activityLog = ActivityLog::find($args['id']);
        if ($activityLog) {
            $activityLog->update($args);
            return $activityLog;
        }
        return null;
    }

    public function deleteActivityLog($_, array $args)
    {
        $activityLog = ActivityLog::find($args['id']);
        if ($activityLog) {
            $activityLog->delete();
            return $activityLog;
        }
        return null;
    }
}
