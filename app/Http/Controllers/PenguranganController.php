<?php

namespace App\Http\Controllers;

use App\Models\Pengurangan;
use App\Models\Staff;
use App\Models\DetailPayroll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PenguranganController extends Controller
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $page = $request->get('page', 1);
            $search = $request->get('search', '');
            $date = $request->get('date', '');

            $query = Pengurangan::with(['staff', 'detailPayroll']);

            if (!empty($search)) {
                $query->where(function($q) use ($search) {
                    $q->where('id', 'like', '%' . $search . '%')
                      ->orWhere('keterangan', 'like', '%' . $search . '%')
                      ->orWhereHas('staff', function($sq) use ($search) {
                          $sq->where('nama', 'like', '%' . $search . '%');
                      });
                });
            }

            if (!empty($date)) {
                $query->whereDate('tanggal', $date);
            }

            $pengurangan = $query->paginate(10, ['*'], 'page', $page);

            return response()->json([
                'data' => $pengurangan->items(),
                'paginatorInfo' => [
                    'currentPage' => $pengurangan->currentPage(),
                    'lastPage' => $pengurangan->lastPage(),
                    'perPage' => $pengurangan->perPage(),
                    'total' => $pengurangan->total(),
                ]
            ]);
        }

        $pengurangan = Pengurangan::with(['staff', 'detailPayroll'])->paginate(10);
        return view('pengurangan.index', compact('pengurangan'));
    }

    public function create()
    {
        $staffs = Staff::all();
        $detailPayrolls = DetailPayroll::all();
        return view('pengurangan.create', compact('staffs', 'detailPayrolls'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'staff_id' => 'required|exists:staff,id',
            'dt_payroll_id' => 'required|exists:detail_payroll,id',
            'keterangan' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            'tanggal' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pengurangan = Pengurangan::create($request->all());
        return response()->json(['message' => 'Pengurangan created successfully', 'data' => $pengurangan], 201);
    }

    public function show($id)
    {
        $pengurangan = Pengurangan::with(['staff', 'detailPayroll'])->findOrFail($id);
        return view('pengurangan.show', compact('pengurangan'));
    }

    public function edit($id)
    {
        $pengurangan = Pengurangan::findOrFail($id);
        $staffs = Staff::all();
        $detailPayrolls = DetailPayroll::all();
        return view('pengurangan.edit', compact('pengurangan', 'staffs', 'detailPayrolls'));
    }

    public function update(Request $request, $id)
    {
        $pengurangan = Pengurangan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'staff_id' => 'required|exists:staff,id',
            'dt_payroll_id' => 'required|exists:detail_payroll,id',
            'keterangan' => 'required|string|max:255',
            'jumlah' => 'required|numeric|min:0',
            'tanggal' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pengurangan->update($request->all());
        return response()->json(['message' => 'Pengurangan updated successfully', 'data' => $pengurangan], 200);
    }

    public function destroy($id)
    {
        $pengurangan = Pengurangan::findOrFail($id);
        $pengurangan->delete();
        return response()->json(['message' => 'Pengurangan deleted successfully'], 200);
    }
}
