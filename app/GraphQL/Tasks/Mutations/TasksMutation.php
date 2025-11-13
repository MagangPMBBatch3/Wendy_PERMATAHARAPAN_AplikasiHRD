<?php

namespace App\GraphQL\Tasks\Mutations;

use App\Models\Tasks;
use Illuminate\Validation\ValidationException;

class TasksMutation {
    public function create(array $args): Tasks
    {
        return Tasks::create($args['input']);
    }

    public function update(array $args): ?Tasks
    {
        $task = Tasks::find($args['id']);
        if (!$task) {
            throw new \Exception('Task not found');
        }
        $task->update($args['input']);
        return $task;
    }

    public function delete(array $args): ?Tasks
    {
        $task = Tasks::find($args['id']);
        if ($task) {
            $task->delete();
        }
        return $task;
    }

    public function restore(array $args): ?Tasks
    {
        return Tasks::withTrashed()->find($args['id'])?->restore()
            ? Tasks::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?Tasks
    {
        $task = Tasks::withTrashed()->find($args['id']);
        if ($task) {
            $task->forceDelete();
        }
        return $task;
    }
}
