<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = ['user_id', 'emotion', 'genre', 'playlist_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
