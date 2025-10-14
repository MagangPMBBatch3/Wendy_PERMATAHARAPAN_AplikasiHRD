<?php

namespace App\GraphQL\Level\Mutations;

use App\Models\Level;

class LevelMutation
{
    public function createLevel($_, array $args)
    {
        return Level::create($args);
    }

    public function updateLevel($_, array $args)
    {
        $level = Level::find($args['id']);
        if ($level) {
            $level->update($args);
            return $level;
        }
        return null;
    }

    public function deleteLevel($_, array $args)
    {
        $level = Level::find($args['id']);
        if ($level) {
            $level->delete();
            return $level;
        }
        return null;
    }
}
