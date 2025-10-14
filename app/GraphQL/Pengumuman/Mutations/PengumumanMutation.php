<?php

namespace App\GraphQL\Pengumuman\Mutations;

use App\Models\Pengumuman;

class PengumumanMutation
{
    public function createPengumuman($_, array $args)
    {
        return Pengumuman::create($args);
    }

    public function updatePengumuman($_, array $args)
    {
        $pengumuman = Pengumuman::find($args['id']);
        if ($pengumuman) {
            $pengumuman->update($args);
            return $pengumuman;
        }
        return null;
    }

    public function deletePengumuman($_, array $args)
    {
        $pengumuman = Pengumuman::find($args['id']);
        if ($pengumuman) {
            $pengumuman->delete();
            return $pengumuman;
        }
        return null;
    }
}
