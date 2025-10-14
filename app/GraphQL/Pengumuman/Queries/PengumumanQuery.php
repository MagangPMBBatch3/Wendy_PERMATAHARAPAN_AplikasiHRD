<?php

namespace App\GraphQL\Pengumuman\Queries;

use App\Models\Pengumuman;

class PengumumanQuery
{
    public function allPengumumans($_, array $args)
    {
        return Pengumuman::all();
    }

    public function getPengumuman($_, array $args)
    {
        return Pengumuman::find($args['id']);
    }
}
