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
        'payroll_id',
        'keterangan',
        'jumlah',
        'tanggal',
        'waktu_datang',
        'durasi_telat',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'waktu_datang' => 'datetime',
        'jumlah' => 'decimal:2',
        'durasi_telat' => 'decimal:2',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }
}
