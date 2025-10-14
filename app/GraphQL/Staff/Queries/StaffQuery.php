<?php

namespace App\GraphQL\Staff\Queries;

use App\Models\Staff;

class StaffQuery
{
    public function allStaffs($_, array $args)
    {
        return Staff::all();
    }

    public function getStaff($_, array $args)
    {
        return Staff::findOrFail($args['id']);
    }
}
