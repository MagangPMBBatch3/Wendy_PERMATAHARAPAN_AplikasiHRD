<?php

namespace App\GraphQL\UserProfile\Mutations;

use App\Models\UserProfile;

class UserProfileMutation {
    public function restore(array $args): ?UserProfile
    {
        return UserProfile::withTrashed()->find($args['id'])?->restore()
            ? UserProfile::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?UserProfile
    {
        $userProfile = UserProfile::withTrashed()->find($args['id']);
        if ($userProfile) {
            $userProfile->forceDelete();
            return $userProfile;
        }
        return null;
    }
}
