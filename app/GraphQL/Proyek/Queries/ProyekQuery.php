<?php

namespace App\GraphQL\Proyek\Queries;

use App\Models\Proyek;

class ProyekQuery
{
    public function allProyeks($_, array $args)
    {
        return Proyek::all();
    }

    public function getProyek($_, array $args)
    {
        return Proyek::findOrFail($args['id']);
    }
}
