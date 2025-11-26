<?php

namespace App\GraphQL\Pengumuman\Queries;

use App\Models\Pengumuman;

class PengumumanQuery
{
    public function allPengumumans($_, array $args)
    {
        $query = Pengumuman::query();

        if (!empty($args['search'])) {
            $search = $args['search'];
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $perPage = isset($args['first']) ? intval($args['first']) : 10;
        $page = isset($args['page']) ? intval($args['page']) : 1;

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function getPengumuman($_, array $args)
    {
        return Pengumuman::find($args['id']);
    }
}
