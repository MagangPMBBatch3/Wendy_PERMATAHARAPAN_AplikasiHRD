<?php
namespace App\GraphQL\User\Mutations;
use App\Models\User;

class UserMutation {
    public function restore(array $args): ?User
    {
        return User::withTrashed()->find($args['id'])?->restore()
            ? User::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?User
    {
        $user = User::withTrashed()->find($args['id']);
        if ($user) {
            $user->forceDelete();
            return $user;
        }
        return null;
    }
}