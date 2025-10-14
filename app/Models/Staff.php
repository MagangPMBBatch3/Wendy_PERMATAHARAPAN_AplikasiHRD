<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'level_id',
        'hire_date',
        'salary',
        'points',
    ];

    protected $casts = [
        'hire_date' => 'date',
        'salary' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function kinerjas()
    {
        return $this->hasMany(Kinerja::class);
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function getTotalPointsAttribute()
    {
        $performancePoints = $this->kinerjas()->sum('points');
        $attendanceBonus = $this->absensis()->where('status', 'present')->count() * 10; // Example: 10 points per present day
        return $performancePoints + $attendanceBonus;
    }
}
