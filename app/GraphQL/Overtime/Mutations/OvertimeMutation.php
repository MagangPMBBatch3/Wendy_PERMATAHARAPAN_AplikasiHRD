<?php

namespace App\GraphQL\Overtime\Mutations;

use App\Models\Overtime;

class OvertimeMutation {
    public function create(array $args): Overtime
    {
        return Overtime::create($args['input']);
    }

    public function update(array $args): ?Overtime
    {
        $overtime = Overtime::find($args['id']);
        if (!$overtime) {
            throw new \Exception('Overtime not found');
        }
        $overtime->update($args['input']);
        return $overtime;
    }

    public function delete(array $args): ?Overtime
    {
        $overtime = Overtime::find($args['id']);
        if ($overtime) {
            $overtime->delete();
        }
        return $overtime;
    }

    public function restore(array $args): ?Overtime
    {
        $overtime = Overtime::withTrashed()->find($args['id']);
        if ($overtime) {
            $overtime->restore();
            return $overtime;
        }
        return null;
    }

    public function forceDelete(array $args): ?Overtime
    {
        $overtime = Overtime::withTrashed()->find($args['id']);
        if ($overtime) {
            $overtime->forceDelete();
        }
        return $overtime;
    }
}
