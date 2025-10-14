<?php

namespace App\GraphQL\Staff\Mutations;

use App\Models\Staff;

class StaffMutation
{
    public function createStaff($_, array $args)
    {
        return Staff::create($args['input']);
    }

    public function updateStaff($_, array $args)
    {
        $staff = Staff::findOrFail($args['id']);
        $staff->update($args['input']);
        return $staff;
    }

    public function deleteStaff($_, array $args)
    {
        $staff = Staff::findOrFail($args['id']);
        $staff->delete();
        return $staff;
    }
}
