<?php

namespace App\GraphQL\User\Queries;

use App\Models\User;

class UserQuery
{
    public function getUser($_, array $args)
    {
        $query = User::query();

        if (!empty($args['search'])) {
            return $query->where('id', 'like', '%' . $args['search'] . '%')
                ->orWhere('nama', 'like', '%' . $args['search'] . '%')
                ->get();
        }

                $perPage = $args['first'] ?? 10;
        $page = $args['page'] ?? 1;

        $paginator = $query->paginate($perPage, ['*'],'page', $page);
        return [
            'data' =>$paginator->items(),
            'paginatorinfo' => [
                'hasMorePages' => $paginator->hasMorePages(),
                'currenPage'=> $paginator->currentPage(),
                'lastPage'=> $paginator->lastPage(),
                'perPage'=> $paginator->perPage(),
                'total'=> $paginator->total(),

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
