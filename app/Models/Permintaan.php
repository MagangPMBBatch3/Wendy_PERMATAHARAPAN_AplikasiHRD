<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permintaan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'permintaan';

    protected $fillable = [
        'staff_id',
        'tipe',
        'keterangan',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'waktu_mulai' => 'datetime',
        'waktu_selesai' => 'datetime',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
