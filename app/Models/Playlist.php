<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = ['user_id', 'name'];

    /**
     * A playlist has many songs.
     */
    public function songs()
    {
        return $this->hasMany(Song::class);
    }
    public function topSongs()
    {
        return $this->hasMany(Song::class)->take(3);
    }
}
