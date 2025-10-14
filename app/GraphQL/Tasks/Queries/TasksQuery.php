<?php

namespace App\GraphQL\Tasks\Queries;

use App\Models\Tasks;

class TasksQuery
{
    public function all($_, array $args)
    {
        $query = Tasks::query();

        if (!empty($args['search'])) {
            return $query->where('id', 'like', '%' . $args['search'] . '%')
                ->orWhere('title', 'like', '%' . $args['search'] . '%')
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

    public function allTasks($_, array $args)
    {
        return Tasks::all();
    }

    public function allArsip($_, array $args)
    {
        return Tasks::onlyTrashed()->get();
    }
}
