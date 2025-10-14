<?php

namespace App\GraphQL\Pengurangan\Mutations;

use App\Models\Pengurangan;

class PenguranganMutation {
    public function restore(array $args): ?Pengurangan
    {
        return Pengurangan::withTrashed()->find($args['id'])?->restore()
            ? Pengurangan::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?Pengurangan
    {
        $pengurangan = Pengurangan::withTrashed()->find($args['id']);
        if ($pengurangan) {
            $pengurangan->forceDelete();
            return $pengurangan;
        }
        return null;
    }
}
