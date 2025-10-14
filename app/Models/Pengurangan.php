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
        'dt_payroll_id',
        'keterangan',
        'jumlah',
        'tanggal',
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
