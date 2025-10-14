<?php

namespace App\GraphQL\UserProfile\Queries;

use App\Models\UserProfile;

class UserProfileQuery
{
    public function all($_, array $args)
    {
        $query = UserProfile::query();

        if (!empty($args['search'])) {
            return $query->where('id', 'like', '%' . $args['search'] . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $args['search'] . '%')
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

    public function allUserProfile($_, array $args)
    {
        return UserProfile::all();
    }

    public function allArsip($_, array $args)
    {
        return UserProfile::onlyTrashed()->get();
    }
}
