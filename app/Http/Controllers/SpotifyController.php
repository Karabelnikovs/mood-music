<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use SpotifyWebAPI\SpotifyWebAPI;
use SpotifyWebAPI\Session;
use App\Models\Playlist;
use App\Models\Song;

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

        $genreMapping = [
            'pop' => 'pop',
            'jazz' => 'jazz',
            'rock' => 'rock',
            'classical' => 'classical',
            'rap' => 'hip-hop',
        ];

        // Check if the genre exists in our mapping; otherwise, default to "pop"
        $spotifyGenre = $genreMapping[$genre] ?? 'pop';

        // Map emotions to Spotify audio features
        $audioFeatures = $this->mapEmotionToFeatures($emotion);

        // Generate recommendations based on genre, mood, and audio features
        $recommendations = $this->spotifyApi->getRecommendations([
            'seed_genres' => [$spotifyGenre],
            'target_energy' => $audioFeatures['energy'],
            'target_valence' => $audioFeatures['valence'],
            'target_danceability' => $audioFeatures['danceability'],
            'limit' => 10,
        ]);

        $tracks = $recommendations->tracks;

        // Shuffle the playlist to ensure randomness
        shuffle($tracks);

        // Store playlist in session
        session(['playlist' => $tracks]);
        return redirect()->route('playlist');
    }

    private function mapEmotionToFeatures($emotion)
    {
        // Define audio features based on mood/emotion
        $features = [
            'happy' => ['energy' => 0.8, 'valence' => 0.9, 'danceability' => 0.7],
            'relaxed' => ['energy' => 0.3, 'valence' => 0.6, 'danceability' => 0.4],
            'energetic' => ['energy' => 0.9, 'valence' => 0.8, 'danceability' => 0.8],
            'sad' => ['energy' => 0.2, 'valence' => 0.3, 'danceability' => 0.2],
        ];

        return $features[$emotion] ?? ['energy' => 0.5, 'valence' => 0.5, 'danceability' => 0.5];
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

    public function storePlaylist(Request $request)
    {
        $trackIds = $request->input('tracks', []);

        if (empty($trackIds)) {
            return back()->withErrors(['message' => 'No tracks selected.']);
        }

        $playlist = Playlist::create(['name' => 'My Playlist']);

        $tracks = session('playlist', []);
        foreach ($tracks as $track) {
            if (in_array($track->id, $trackIds)) {
                Song::create([
                    'playlist_id' => $playlist->id,
                    'spotify_id' => $track->id,
                    'name' => $track->name,
                    'artist' => $track->artists[0]->name,
                    'album_cover_url' => $track->album->images[0]->url ?? null,
                    'preview_url' => $track->preview_url ?? null,
                ]);
            }
        }

        return redirect()->route('playlists.index')->with('success', 'Playlist created successfully!');
    }

    public function indexPlaylists()
    {
        $playlists = Playlist::with('songs')->get();
        return Inertia::render('Playlists', ['playlists' => $playlists]);
    }

}

