<?php

namespace App\GraphQL\Pengurangan\Queries;

use App\Models\Pengurangan;

class PenguranganQuery
{
    public function all($_, array $args)
    {
        $query = Pengurangan::query();

        if (!empty($args['search'])) {
            return $query->where('id', 'like', '%' . $args['search'] . '%')
                ->orWhere('keterangan', 'like', '%' . $args['search'] . '%')
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

    public function allPengurangan($_, array $args)
    {
        return Pengurangan::all();
    }

    public function allArsip($_, array $args)
    {
        return Pengurangan::onlyTrashed()->get();
    }
}
