<?php

namespace App\GraphQL\DetailPayroll\Mutations;

use App\Models\DetailPayroll;

class DetailPayrollMutation {
    public function restore(array $args): ?DetailPayroll
    {
        return DetailPayroll::withTrashed()->find($args['id'])?->restore()
            ? DetailPayroll::find($args['id'])
            : null;
    }

    public function forceDelete(array $args): ?DetailPayroll
    {
        $detailPayroll = DetailPayroll::withTrashed()->find($args['id']);
        if ($detailPayroll) {
            $detailPayroll->forceDelete();
            return $detailPayroll;
        }
        return null;
    }
}
