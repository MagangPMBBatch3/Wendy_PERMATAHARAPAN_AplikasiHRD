<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index()
    {
        return view('tasks.index');
    }

    public function create()
    {
        return view('tasks.create');
    }

    public function show($id)
    {
        return view('tasks.show', compact('id'));
    }

    public function edit($id)
    {
        return view('tasks.edit', compact('id'));
    }
}
