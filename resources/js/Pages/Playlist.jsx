import React from 'react';

const Playlist = ({ playlist }) => {
    // Sort playlist: tracks with previews first
    const sortedPlaylist = [...playlist].sort((a, b) => {
        return b.preview_url ? 1 : -1;
    });

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-4 relative">
            <a
                href="/"
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
                Back
            </a>
            
            <h1 className="text-3xl font-bold mb-8 text-center">Generated Playlist</h1>

            {sortedPlaylist.length ? (
                <ul className="w-full max-w-2xl space-y-6">
                    {sortedPlaylist.map((track) => (
                        <li key={track.id} className="flex items-start bg-gray-800 rounded-lg p-4 shadow-md">
                            <img
                                src={track.album.images[0]?.url || '/default-album-cover.jpg'}
                                alt="Album cover"
                                className="w-20 h-20 rounded-md object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-teal-400">{track.name}</h3>
                                <p className="text-gray-400">Artist: {track.artists[0]?.name || 'Unknown'}</p>

                                {track.preview_url ? (
                                    <audio src={track.preview_url} controls className="mt-2 w-full" />
                                ) : (
                                    <div className="mt-2 text-sm text-gray-500 italic">
                                        Preview not available
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-center mt-6">
                    No tracks available. Try generating a playlist with a different mood or genre.
                </p>
            )}
        </div>
    );
};

export default Playlist;
