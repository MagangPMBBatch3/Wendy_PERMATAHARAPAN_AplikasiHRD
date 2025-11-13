<?php

namespace App\GraphQL\Tunjangan\Mutations;

use App\Models\Tunjangan;

class TunjanganMutation {
    public function create(array $args): Tunjangan
    {
        return Tunjangan::create($args['input']);
    }

    public function update(array $args): ?Tunjangan
    {
        $tunjangan = Tunjangan::find($args['id']);
        if (!$tunjangan) {
            throw new \Exception('Tunjangan not found');
        }
        $tunjangan->update($args['input']);
        return $tunjangan;
    }

    public function delete(array $args): ?Tunjangan
    {
        $tunjangan = Tunjangan::find($args['id']);
        if ($tunjangan) {
            $tunjangan->delete();
        }
        return $tunjangan;
    }

    public function restore(array $args): ?Tunjangan
    {
        return Tunjangan::withTrashed()->find($args['id'])?->restore()
            ? Tunjangan::find($args['id'])
            : null;
    }

    public function forceDelete($idOrArgs): ?Tunjangan
    {
        // allow calling with either an array of args ['id' => ...] or a direct id value
        $id = is_array($idOrArgs) ? ($idOrArgs['id'] ?? null) : $idOrArgs;
        $tunjangan = $id ? Tunjangan::withTrashed()->find($id) : null;
        if ($tunjangan) {
            $tunjangan->forceDelete();
        }
        return $tunjangan;
    }
}
