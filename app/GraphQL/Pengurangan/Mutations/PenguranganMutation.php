<?php

namespace App\GraphQL\Pengurangan\Mutations;

use App\Models\Pengurangan;

class PenguranganMutation {
    public function create(array $args): Pengurangan
    {
        return Pengurangan::create($args['input']);
    }

    public function update(array $args): ?Pengurangan
    {
        $pengurangan = Pengurangan::find($args['id']);
        if (!$pengurangan) {
            throw new \Exception('Pengurangan not found');
        }
        $pengurangan->update($args['input']);
        return $pengurangan;
    }

    public function delete(array $args): ?Pengurangan
    {
        $pengurangan = Pengurangan::find($args['id']);
        if ($pengurangan) {
            $pengurangan->delete();
        }
        return $pengurangan;
    }

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
        }
        return $pengurangan;
    }
}
