<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index()
    {
        return view('activitylog.index');
    }

    public function show(ActivityLog $activitylog)
    {
        return view('activitylog.show', compact('activitylog'));
    }
}
