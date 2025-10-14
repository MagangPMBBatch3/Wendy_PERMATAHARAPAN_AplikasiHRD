<?php

namespace App\GraphQL\PenguranganTelat\Mutations;

use App\Models\PenguranganTelat;

class PenguranganTelatMutation {
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
            return $penguranganTelat;
        }
        return null;
    }
}
