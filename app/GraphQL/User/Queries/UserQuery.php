<?php

namespace App\GraphQL\User\Queries;

use App\Models\User;

class UserQuery
{
    public function all($_, array $args)
    {
        $query = User::query();

        // Apply search filter
        if (!empty($args['search'])) {
            $search = $args['search'];
            $query->where(function($q) use ($search) {
                $q->where('id', 'like', '%' . $search . '%')
                  ->orWhere('name', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        $perPage = $args['first'] ?? 10;
        $page = $args['page'] ?? 1;

        $paginator = $query->paginate($perPage, ['*'], 'page', $page);
        
        return [
            'data' => $paginator->items(),
            'paginatorInfo' => [
                'hasMorePages' => $paginator->hasMorePages(),
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ];
    }

    public function allUser($_, array $args)
    {
        return User::all();
    }

    public function allArsip($_, array $args)
    {
        return User::onlyTrashed()->get();
    }
}
