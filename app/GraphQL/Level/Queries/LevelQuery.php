<?php

namespace App\GraphQL\Level\Queries;

use App\Models\Level;

class LevelQuery
{
    public function allLevels($_, array $args)
    {
        return Level::all();
    }

    public function getLevel($_, array $args)
    {
        return Level::find($args['id']);
    }
}
