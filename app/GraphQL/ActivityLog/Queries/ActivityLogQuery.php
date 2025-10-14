<?php

namespace App\GraphQL\ActivityLog\Queries;

use App\Models\ActivityLog;

class ActivityLogQuery
{
    public function allActivityLogs($_, array $args)
    {
        return ActivityLog::all();
    }

    public function getActivityLog($_, array $args)
    {
        return ActivityLog::find($args['id']);
    }
}
