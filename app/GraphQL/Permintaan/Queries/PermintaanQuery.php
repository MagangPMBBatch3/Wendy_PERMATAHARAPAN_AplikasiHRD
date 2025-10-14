<?php

namespace App\GraphQL\Permintaan\Queries;

use App\Models\Permintaan;

class PermintaanQuery
{
    public function all($_, array $args)
    {
        $query = Permintaan::query();

        if (!empty($args['search'])) {
            return $query->where('id', 'like', '%' . $args['search'] . '%')
                ->orWhere('tipe', 'like', '%' . $args['search'] . '%')
                ->get();
        }

        $perPage = $args['first'] ?? 10;
        $page = $args['page'] ?? 1;

        $paginator = $query->paginate($perPage, ['*'],'page', $page);
        return [
            'data' =>$paginator->items(),
            'paginatorInfo' => [
                'hasMorePages' => $paginator->hasMorePages(),
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ];
    }

    public function allPermintaan($_, array $args)
    {
        return Permintaan::all();
    }

    public function allArsip($_, array $args)
    {
        return Permintaan::onlyTrashed()->get();
    }
}
