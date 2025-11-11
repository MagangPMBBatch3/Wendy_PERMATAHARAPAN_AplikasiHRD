<?php

namespace App\Http\Controllers;

use App\Models\Permintaan;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermintaanController extends Controller
{
    public function index()
    {
        return view('permintaan.index');
    }

    public function create()
    {
        $staffs = Staff::all();
        return view('permintaan.create', compact('staffs'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'staff_id' => 'required|exists:staff,id',
            'tipe' => 'required|in:cuti,izin,lembur',
            'keterangan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'nullable|date_format:H:i',
            'waktu_selesai' => 'nullable|date_format:H:i|after:waktu_mulai',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permintaan = Permintaan::create($request->all());
        return response()->json(['message' => 'Permintaan created successfully', 'data' => $permintaan], 201);
    }

    public function show($id)
    {
        $permintaan = Permintaan::with('staff')->findOrFail($id);
        return view('permintaan.show', compact('permintaan'));
    }

    public function edit($id)
    {
        $permintaan = Permintaan::findOrFail($id);
        $staffs = Staff::all();
        return view('permintaan.edit', compact('permintaan', 'staffs'));
    }

    public function update(Request $request, $id)
    {
        $permintaan = Permintaan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'staff_id' => 'required|exists:staff,id',
            'tipe' => 'required|in:cuti,izin,lembur',
            'keterangan' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'waktu_mulai' => 'nullable|date_format:H:i',
            'waktu_selesai' => 'nullable|date_format:H:i|after:waktu_mulai',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permintaan->update($request->all());
        return response()->json(['message' => 'Permintaan updated successfully', 'data' => $permintaan], 200);
    }

    public function destroy($id)
    {
        $permintaan = Permintaan::findOrFail($id);
        $permintaan->delete();
        return response()->json(['message' => 'Permintaan deleted successfully'], 200);
    }
}
