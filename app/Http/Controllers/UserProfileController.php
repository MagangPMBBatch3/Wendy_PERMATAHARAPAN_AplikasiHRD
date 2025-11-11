<?php

namespace App\Http\Controllers;

use App\Models\UserProfile;
use App\Models\User;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    public function index()
    {
        return view('userprofile.index');
    }

    public function create()
    {
        $users = User::all();
        $staffs = Staff::all();
        return view('userprofile.create', compact('users', 'staffs'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'staff_id' => 'required|exists:staff,id',
            'nama_lengkap' => 'required|string|max:255',
            'nrp' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'foto' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userProfile = UserProfile::create($request->all());
        return response()->json(['message' => 'User profile created successfully', 'data' => $userProfile], 201);
    }

    public function show($id)
    {
        $userProfile = UserProfile::with(['user', 'staff'])->findOrFail($id);
        return view('userprofile.show', compact('userProfile'));
    }

    public function edit($id)
    {
        $userProfile = UserProfile::findOrFail($id);
        $users = User::all();
        $staffs = Staff::all();
        return view('userprofile.edit', compact('userProfile', 'users', 'staffs'));
    }

    public function update(Request $request, $id)
    {
        $userProfile = UserProfile::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'staff_id' => 'required|exists:staff,id',
            'nama_lengkap' => 'required|string|max:255',
            'nrp' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'foto' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $userProfile->update($request->all());
        return response()->json(['message' => 'User profile updated successfully', 'data' => $userProfile], 200);
    }

    public function destroy($id)
    {
        $userProfile = UserProfile::findOrFail($id);
        $userProfile->delete();
        return response()->json(['message' => 'User profile deleted successfully'], 200);
    }
}
