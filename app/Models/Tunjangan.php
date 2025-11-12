<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tunjangan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tunjangan';

    protected $fillable = [
        'staff_id',
        'dt_payroll_id',
        'jenis',
        'periode',
        'keterangan',
        'jumlah',
        'tanggal',
        'bulan',
        'tahun',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function detailPayroll()
    {
        return $this->belongsTo(DetailPayroll::class, 'dt_payroll_id');
    }
}
