<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use SpotifyWebAPI\SpotifyWebAPI;
use SpotifyWebAPI\Session;

class SpotifyController extends Controller
{
    private $spotifyApi;
    private $session;

    public function __construct()
    {
        $this->session = new Session(
            config('services.spotify.client_id'),
            config('services.spotify.client_secret'),
            config('services.spotify.redirect_uri')
        );

        $this->spotifyApi = new SpotifyWebAPI();
    }

    public function getSpotifyAccessToken()
    {
        if (!$this->session->getAccessToken()) {
            $this->session->requestCredentialsToken();
        }

        return $this->session->getAccessToken();
    }

    public function generatePlaylist(Request $request)
    {
        $this->spotifyApi->setAccessToken($this->getSpotifyAccessToken());

        $emotion = $request->input('emotion');
        $genre = $request->input('genre');

        $playlists = $this->spotifyApi->search("genre:$genre mood:$emotion", 'playlist', ['limit' => 10]);

        session(['playlist' => $playlists->playlists->items]);
        // dd($playlists->playlists->items);
        return redirect()->route('playlist');
    }

    public function showPlaylist()
    {
        $playlist = session('playlist', []);
        return Inertia::render('Playlist', ['playlist' => $playlist]);
    }


    public function index()
    {
        return Inertia::render('Home');
    }

    // public function generatePlaylist(Request $request)
    // {
    //     $emotion = $request->input('emotion');
    //     $genre = $request->input('genre');

    //     $playlistData = $this->createPlaylistByEmotionAndGenre($emotion, $genre);
    //     return Inertia::render('Playlist', ['playlist' => $playlistData]);
    // }

    private function createPlaylistByEmotionAndGenre($emotion, $genre)
    {
        // Map emotions to mood keywords or Spotify track attributes (e.g., danceability, energy)
        $tracks = $this->spotifyApi->search("genre:$genre mood:$emotion", 'track', ['limit' => 20]);

        // Additional logic to create a playlist or retrieve existing ones
        return $tracks->tracks->items;
    }
}
