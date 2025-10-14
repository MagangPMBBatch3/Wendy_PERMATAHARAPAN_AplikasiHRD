<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tasks extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tasks';

    protected $fillable = [
        'creator_id',
        'assignee_id',
        'proyek_id',
        'title',
        'description',
        'due_date',
        'start_at',
        'end_at',
        'priority',
        'status',
        'attachment',
    ];

    public function creator()
    {
        return $this->belongsTo(Staff::class, 'creator_id');
    }

    public function assignee()
    {
        return $this->belongsTo(Staff::class, 'assignee_id');
    }

    public function proyek()
    {
        return $this->belongsTo(Proyek::class);
    }
}
