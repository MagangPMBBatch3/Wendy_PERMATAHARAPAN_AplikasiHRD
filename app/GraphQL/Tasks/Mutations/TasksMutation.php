<?php

namespace App\GraphQL\Tasks\Mutations;

use App\Models\Tasks;

class TasksMutation {
    public function restore(array $args): ?Tasks
    {
        return Tasks::withTrashed()->find($args['id'])?->restore()
            ? Tasks::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?Tasks
    {
        $tasks = Tasks::withTrashed()->find($args['id']);
        if ($tasks) {
            $tasks->forceDelete();
            return $tasks;
        }
        return null;
    }
}
