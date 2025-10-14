<?php

namespace App\GraphQL\Tunjangan\Mutations;

use App\Models\Tunjangan;

class TunjanganMutation {
    public function restore(array $args): ?Tunjangan
    {
        return Tunjangan::withTrashed()->find($args['id'])?->restore()
            ? Tunjangan::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?Tunjangan
    {
        $tunjangan = Tunjangan::withTrashed()->find($args['id']);
        if ($tunjangan) {
            $tunjangan->forceDelete();
            return $tunjangan;
        }
        return null;
    }
}
