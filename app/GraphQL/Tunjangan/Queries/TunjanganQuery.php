<?php

namespace App\GraphQL\Tunjangan\Queries;

use App\Models\Tunjangan;

class TunjanganQuery
{
    public function all($_, array $args)
    {
        $query = Tunjangan::query();

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

    public function allTunjangan($_, array $args)
    {
        return Tunjangan::all();
    }

    public function allArsip($_, array $args)
    {
        return Tunjangan::onlyTrashed()->get();
    }
}
