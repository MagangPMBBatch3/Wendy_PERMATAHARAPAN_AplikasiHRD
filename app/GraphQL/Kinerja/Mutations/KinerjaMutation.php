<?php

namespace App\GraphQL\Kinerja\Mutations;

use App\Models\Kinerja;

class KinerjaMutation
{
    public function createKinerja($_, array $args)
    {
        return Kinerja::create($args['input']);
    }

    public function updateKinerja($_, array $args)
    {
        $kinerja = Kinerja::findOrFail($args['id']);
        $kinerja->update($args['input']);
        return $kinerja;
    }

    public function deleteKinerja($_, array $args)
    {
        $kinerja = Kinerja::findOrFail($args['id']);
        $kinerja->delete();
        return $kinerja;
    }
}
