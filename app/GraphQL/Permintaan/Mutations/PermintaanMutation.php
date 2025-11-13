<?php

namespace App\GraphQL\Permintaan\Mutations;

use App\Models\Permintaan;

class PermintaanMutation {
    public function create(array $args): Permintaan
    {
        return Permintaan::create($args['input']);
    }

    public function update(array $args): ?Permintaan
    {
        $permintaan = Permintaan::find($args['id']);
        if (!$permintaan) {
            throw new \Exception('Permintaan not found');
        }
        $permintaan->update($args['input']);
        return $permintaan;
    }

    public function delete(array $args): ?Permintaan
    {
        $permintaan = Permintaan::find($args['id']);
        if ($permintaan) {
            $permintaan->delete();
        }
        return $permintaan;
    }

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
        }
        return $permintaan;
    }
}
