<?php

namespace App\GraphQL\Overtime\Mutations;

use App\Models\Overtime;

class OvertimeMutation {
    public function restore(array $args): ?Overtime
    {
        return Overtime::withTrashed()->find($args['id'])?->restore()
            ? Overtime::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?Overtime
    {
        $overtime = Overtime::withTrashed()->find($args['id']);
        if ($overtime) {
            $overtime->forceDelete();
            return $overtime;
        }
        return null;
    }
}
