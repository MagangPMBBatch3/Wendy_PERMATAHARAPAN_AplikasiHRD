<?php

namespace App\GraphQL\Absensi\Queries;

use App\Models\Absensi;

class AbsensiQuery
{
    public function allAbsensis($_, array $args)
    {
        return Absensi::all();
    }

    public function getAbsensi($_, array $args)
    {
        return Absensi::find($args['id']);
    }
}
