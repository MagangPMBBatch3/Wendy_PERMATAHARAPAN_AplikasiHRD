<?php

namespace App\GraphQL\Absensi\Mutations;

use App\Models\Absensi;

class AbsensiMutation
{
    public function createAbsensi($_, array $args)
    {
        return Absensi::create($args);
    }

    public function updateAbsensi($_, array $args)
    {
        $absensi = Absensi::find($args['id']);
        if ($absensi) {
            $absensi->update($args);
            return $absensi;
        }
        return null;
    }

    public function deleteAbsensi($_, array $args)
    {
        $absensi = Absensi::find($args['id']);
        if ($absensi) {
            $absensi->delete();
            return $absensi;
        }
        return null;
    }
}
