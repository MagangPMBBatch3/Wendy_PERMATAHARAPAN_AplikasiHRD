<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PenguranganTelat extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengurangan_telat';

    protected $fillable = [
        'staff_id',
        'dt_payroll_id',
        'keterangan',
        'jumlah',
        'tanggal',
        'waktu_datang',
        'durasi_telat',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'durasi_telat' => 'decimal:2',
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
