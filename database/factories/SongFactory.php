<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SongFactory extends Factory
{
    public function definition()
    {
        return [
            'playlist_id' => \App\Models\Playlist::factory(),
            'spotify_id' => $this->faker->uuid,
            'name' => $this->faker->sentence(2),
            'artist' => $this->faker->name,
            'album_cover_url' => $this->faker->imageUrl(),
            'preview_url' => $this->faker->url,
        ];
    }
}
