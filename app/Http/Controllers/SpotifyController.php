<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Support\Facades\Auth;

class SpotifyController extends Controller
{
    public function generatePlaylist(Request $request)
    {
        //hyfyhg
        // Fetch inputs
        $emotion = $request->input('emotion');
        $genre = $request->input('genre');

        // Spotify API credentials
        $clientId = config('services.spotify.client_id');
        $clientSecret = config('services.spotify.client_secret');

        // Obtain access token from Spotify API
        $tokenResponse = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
        ]);

        if (!$tokenResponse->successful()) {
            return back()->withErrors(['message' => 'Unable to fetch Spotify token.']);
        }

        $accessToken = $tokenResponse->json()['access_token'];

        // Map emotions to keywords for the search query
        $emotionKeywords = [
            'happy' => 'happy',
            'relaxed' => 'relax',
            'energetic' => 'energetic',
            'sad' => 'sad',
        ];

        $keyword = $emotionKeywords[$emotion] ?? $emotion;

        // Search tracks based on emotion and genre
        $searchResponse = Http::withToken($accessToken)->get('https://api.spotify.com/v1/search', [
            'q' => "$keyword genre:$genre",
            'type' => 'track',
            'limit' => 10,
        ]);

        if (!$searchResponse->successful()) {
            return back()->withErrors(['message' => 'Unable to fetch tracks from Spotify.']);
        }

        $tracks = $searchResponse->json()['tracks']['items'] ?? [];

        // Format the tracks data
        $formattedTracks = collect($tracks)->map(function ($track) {
            return [
                'id' => $track['id'],
                'name' => $track['name'],
                'artist' => $track['artists'][0]['name'], // Ensure this exists
                'url' => $track['external_urls']['spotify'],
                'preview_url' => $track['preview_url'],
                'album_cover_url' => $track['album']['images'][0]['url'] ?? null, // Make it explicit
                'album' => [
                    'name' => $track['album']['name'] ?? 'Unknown', // Album Name
                    'images' => $track['album']['images'] ?? [], // Album Cover Images
                ],
            ];
        })->toArray();


        // Save playlist to session
        session(['playlist' => $formattedTracks]);

        return redirect()->route('playlist');
    }

    public function showPlaylist()
    {
        // Retrieve playlist from session
        $playlist = session('playlist', []);

        return Inertia::render('Playlist', ['playlist' => $playlist]);
    }

    public function index()
    {
        return Inertia::render('Home');
    }

    public function storePlaylist(Request $request)
    {
        $trackIds = $request->input('tracks', []);

        if (empty($trackIds)) {
            return back()->withErrors(['message' => 'No tracks selected.']);
        }

        // Create playlist
        $playlist = Playlist::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
        ]);

        $tracks = session('playlist', []);

        foreach ($tracks as $track) {
            if (in_array($track['id'], $trackIds)) {
                Song::create([
                    'playlist_id' => $playlist->id,
                    'spotify_id' => $track['id'],
                    'name' => $track['name'],
                    'artist' => $track['artist'],
                    'album_cover_url' => $track['album']['images'][0]['url'] ?? null,
                    'preview_url' => $track['preview_url'],
                ]);
            }
        }

        return redirect()->route('playlists.index')->with('success', 'Playlist created successfully!');
    }


    public function indexPlaylists()
    {
        $playlists = Playlist::with('topSongs')->where('id', Auth::user()->id)->get();
        $fullPlaylists = Playlist::with('songs')->where('id', Auth::user()->id)->get();
        // dd($playlists);
        return Inertia::render('Playlists', ['playlists' => $playlists, 'fullPlaylists' => $fullPlaylists]);
    }
    public function destroyPlaylist($id)
    {
        $playlist = Playlist::findOrFail($id);
        $playlist->delete();

        return redirect()->back()->with('message', 'Playlist deleted successfully!');
    }
}


