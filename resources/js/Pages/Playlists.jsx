import React from "react";

const Playlists = ({ playlists }) => {
    return (
        <div className="bg-black min-h-screen p-4 text-white">
            <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>
            <div className="space-y-6">
                {playlists.map((playlist) => (
                    <div
                        key={playlist.id}
                        className="bg-gray-800 p-4 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-semibold">
                            {playlist.name}
                        </h2>
                        <ul className="mt-4 space-y-2">
                            {playlist.songs.map((song) => (
                                <li key={song.id} className="flex items-center">
                                    <img
                                        src={
                                            song.album_cover_url ||
                                            "/default-album-cover.jpg"
                                        }
                                        alt="Album cover"
                                        className="w-12 h-12 rounded-md mr-4"
                                    />
                                    <div>
                                        <p className="text-lg">{song.name}</p>
                                        <p className="text-sm text-gray-400">
                                            {song.artist}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Playlists;
