<?php

namespace App\GraphQL\Payroll\Mutations;

use App\Models\Payroll;

class PayrollMutation
{
    public function createPayroll($_, array $args)
    {
        return Payroll::create($args);
    }

    public function updatePayroll($_, array $args)
    {
        $payroll = Payroll::find($args['id']);
        if ($payroll) {
            $payroll->update($args);
            return $payroll;
        }
        return null;
    }

    public function deletePayroll($_, array $args)
    {
        $payroll = Payroll::find($args['id']);
        if ($payroll) {
            $payroll->delete();
            return $payroll;
        }
        return null;
    }
}
