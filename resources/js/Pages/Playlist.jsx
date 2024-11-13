import React from "react";

function Playlist({ playlist }) {
    return (
        <div className="bg-black h-screen">
            <a
                href="/"
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
                Back
            </a>
            <div className="h-full flex flex-col items-center justify-center text-white gap-2">
                <h1 className="text-3xl font-extrabold mb-8">
                    Your Generated Playlist
                </h1>
                {playlist.length > 0 ? (
                    playlist.map((playlist, index) => (
                        <div
                            key={playlist.name}
                            className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 min-w-64"
                        >
                            <h3>{playlist.name}</h3>
                            <p>Created by: {playlist.owner.display_name}</p>
                            <a
                                href={playlist.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                Open on Spotify
                            </a>
                            {playlist.images.length > 0 && (
                                <img
                                    src={playlist.images[0].url}
                                    alt={playlist.name}
                                    className="mt-2 h-24 object-cover"
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p>
                        No playlists found for the selected emotion and genre.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Playlist;
