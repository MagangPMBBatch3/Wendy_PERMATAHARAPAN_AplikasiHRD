<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\Proyek;
use App\Models\Tasks;
use App\Models\Payroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $data = [
            'total_staff' => Staff::count(),
            'total_projects' => Proyek::count(),
            'total_tasks' => Tasks::count(),
            'pending_payrolls' => \DB::table('payroll')->where('status', 'pending')->count(),
            'user' => $user,
        ];

        if ($user->isStaff()) {
            $staff = $user->staff;
            if ($staff) {
                $data['my_tasks'] = Tasks::where('assignee_id', $user->id)->count();
                $data['my_projects'] = $staff->kinerjas()->distinct('proyek_id')->count();
                $data['my_payrolls'] = \DB::table('payroll')->where('staff_id', $staff->id)->count();
            }
        }

        return view('dashboard.index', $data);
    }
}
