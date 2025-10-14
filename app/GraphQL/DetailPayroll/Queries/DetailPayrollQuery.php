<?php

namespace App\GraphQL\DetailPayroll\Queries;

use App\Models\DetailPayroll;

class DetailPayrollQuery
{
    public function all($_, array $args)
    {
        $query = DetailPayroll::query();

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

    public function allDetailPayroll($_, array $args)
    {
        return DetailPayroll::all();
    }

    public function allArsip($_, array $args)
    {
        return DetailPayroll::onlyTrashed()->get();
    }
}
