<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pengurangan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pengurangan';

    protected $fillable = [
        'staff_id',
        'payroll_id',
        'tipe',
        'keterangan',
        'jumlah',
        'tanggal',
        'bulan',
        'tahun',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jumlah' => 'decimal:2',
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
