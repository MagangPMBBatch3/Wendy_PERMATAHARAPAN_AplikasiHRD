<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kinerja extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'staff_id',
        'proyek_id',
        'points',
        'description',
        'date',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class);
    }
}
