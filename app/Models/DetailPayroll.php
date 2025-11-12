<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetailPayroll extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'detail_payroll';

    protected $fillable = [
        'payroll_id',
        'staff_id',
        'lembur',
        'bonus',
        'pengurangan',
        'total_gaji',
        'tanggal',
        'keterangan',
    ];

    protected $casts = [
        'lembur' => 'decimal:2',
        'bonus' => 'decimal:2',
        'pengurangan' => 'decimal:2',
        'total_gaji' => 'decimal:2',
    ];

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function pengurangan()
    {
        return $this->hasMany(Pengurangan::class, 'dt_payroll_id');
    }

    public function tunjangan()
    {
        return $this->hasMany(Tunjangan::class, 'dt_payroll_id');
    }

    public function overtime()
    {
        return $this->hasMany(Overtime::class, 'dt_payroll_id');
    }
}
