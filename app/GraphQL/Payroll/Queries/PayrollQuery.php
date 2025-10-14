<?php

namespace App\GraphQL\Payroll\Queries;

use App\Models\Payroll;

class PayrollQuery
{
    public function allPayrolls($_, array $args)
    {
        return Payroll::all();
    }

    public function getPayroll($_, array $args)
    {
        return Payroll::find($args['id']);
    }
}
