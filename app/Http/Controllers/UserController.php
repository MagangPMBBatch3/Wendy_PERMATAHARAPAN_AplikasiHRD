<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return view('user.index');
    }

    public function create()
    {
        return view('user.create');
    }

    public function store(Request $request)
    {
        // GraphQL mutation handles the actual creation
        return redirect()->route('user.index');
    }

    public function show(User $user)
    {
        return view('user.show', compact('user'));
    }

    public function edit(User $user)
    {
        return view('user.edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        // GraphQL mutation handles the actual update
        return redirect()->route('user.index');
    }

    public function destroy(User $user)
    {
        // GraphQL mutation handles the actual deletion
        return redirect()->route('user.index');
    }
}
