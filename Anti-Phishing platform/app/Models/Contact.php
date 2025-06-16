<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'message',
        'status',
        'read_at',
        'read_by',
        'admin_notes',
        'ip_address',
        'user_agent',
    ];

    protected $casts = [
        'read_at' => 'datetime',
    ];

    public function readBy()
    {
        return $this->belongsTo(User::class, 'read_by');
    }

    public function markAsRead($userId = null)
    {
        $this->update([
            'status' => 'read',
            'read_at' => now(),
            'read_by' => $userId,
        ]);
    }

    public function markAsReplied()
    {
        $this->update([
            'status' => 'replied',
        ]);
    }

    public function scopeUnread($query)
    {
        return $query->where('status', 'unread');
    }

    public function scopeRead($query)
    {
        return $query->where('status', 'read');
    }

    public function scopeReplied($query)
    {
        return $query->where('status', 'replied');
    }
}
