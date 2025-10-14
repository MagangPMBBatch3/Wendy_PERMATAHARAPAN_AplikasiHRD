<?php

namespace App\GraphQL\Proyek\Mutations;

use App\Models\Proyek;

class ProyekMutation
{
    public function createProyek($_, array $args)
    {
        return Proyek::create($args['input']);
    }

    public function updateProyek($_, array $args)
    {
        $proyek = Proyek::findOrFail($args['id']);
        $proyek->update($args['input']);
        return $proyek;
    }

    public function deleteProyek($_, array $args)
    {
        $proyek = Proyek::findOrFail($args['id']);
        $proyek->delete();
        return $proyek;
    }
}
