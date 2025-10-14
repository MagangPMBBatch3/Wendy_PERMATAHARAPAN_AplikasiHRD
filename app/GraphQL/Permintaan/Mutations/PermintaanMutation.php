<?php

namespace App\GraphQL\Permintaan\Mutations;

use App\Models\Permintaan;

class PermintaanMutation {
    public function restore(array $args): ?Permintaan
    {
        return Permintaan::withTrashed()->find($args['id'])?->restore()
            ? Permintaan::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?Permintaan
    {
        $permintaan = Permintaan::withTrashed()->find($args['id']);
        if ($permintaan) {
            $permintaan->forceDelete();
            return $permintaan;
        }
        return null;
    }
}
