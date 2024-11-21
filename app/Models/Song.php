<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'playlist_id',
        'spotify_id',
        'name',
        'artist',
        'album_cover_url',
        'preview_url',
    ];

    /**
     * A song belongs to a playlist.
     */
    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }
}
