<?php

namespace App\GraphQL\PenguranganTelat\Mutations;

use App\Models\PenguranganTelat;

class PenguranganTelatMutation {
    public function create(array $args): PenguranganTelat
    {
        return PenguranganTelat::create($args['input']);
    }

    public function update(array $args): ?PenguranganTelat
    {
        $penguranganTelat = PenguranganTelat::find($args['id']);
        if (!$penguranganTelat) {
            throw new \Exception('PenguranganTelat not found');
        }
        $penguranganTelat->update($args['input']);
        return $penguranganTelat;
    }

    public function delete(array $args): ?PenguranganTelat
    {
        $penguranganTelat = PenguranganTelat::find($args['id']);
        if ($penguranganTelat) {
            $penguranganTelat->delete();
        }
        return $penguranganTelat;
    }

    public function restore(array $args): ?PenguranganTelat
    {
        return PenguranganTelat::withTrashed()->find($args['id'])?->restore()
            ? PenguranganTelat::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?PenguranganTelat
    {
        $penguranganTelat = PenguranganTelat::withTrashed()->find($args['id']);
        if ($penguranganTelat) {
            $penguranganTelat->forceDelete();
        }
        return $penguranganTelat;
    }
}
