<?php

namespace App\GraphQL\UserProfile\Mutations;

use App\Models\UserProfile;

class UserProfileMutation {
    public function create(array $args): UserProfile
    {
        return UserProfile::create($args['input']);
    }

    public function update(array $args): ?UserProfile
    {
        $userProfile = UserProfile::find($args['id']);
        if (!$userProfile) {
            throw new \Exception('UserProfile not found');
        }
        $userProfile->update($args['input']);
        return $userProfile;
    }

    public function delete(array $args): ?UserProfile
    {
        $userProfile = UserProfile::find($args['id']);
        if ($userProfile) {
            $userProfile->delete();
        }
        return $userProfile;
    }

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
        }
        return $userProfile;
    }
}
