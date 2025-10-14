<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Overtime extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'overtime';

    protected $fillable = [
        'staff_id',
        'proyek_id',
        'dt_payroll_id',
        'keterangan',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
        'durasi_jam',
        'foto',
        'status',
    ];

    protected $casts = [
        'durasi_jam' => 'decimal:2',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class);
    }

    public function detailPayroll()
    {
        return $this->belongsTo(DetailPayroll::class, 'dt_payroll_id');
    }
}
