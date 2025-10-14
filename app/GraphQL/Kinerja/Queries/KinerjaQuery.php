<?php

namespace App\GraphQL\Kinerja\Queries;

use App\Models\Kinerja;

class KinerjaQuery
{
    public function allKinerjas($_, array $args)
    {
        return Kinerja::all();
    }

    public function getKinerja($_, array $args)
    {
        return Kinerja::findOrFail($args['id']);
    }
}
