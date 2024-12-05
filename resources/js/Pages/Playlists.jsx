import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Playlists = ({ playlists, fullPlaylists }) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this playlist?")) {
            Inertia.delete(`/playlist/${id}`);
        }
    };

    const handleOpenPlaylist = (id) => {
        const fullPlaylist = fullPlaylists.find(
            (playlist) => playlist.id === id
        );
        setSelectedPlaylist(fullPlaylist);
    };

    const closeModal = () => setSelectedPlaylist(null);

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-4 relative">
            <a
                href="/"
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
                Generate
            </a>
            <h1 className="text-3xl font-bold mb-8">Your Playlists</h1>
            {playlists.map((playlist) => (
                <div
                    key={playlist.id}
                    className="bg-gray-800 rounded-lg p-4 shadow-md mb-6 w-full max-w-2xl"
                >
                    <div className="flex justify-between items-center">
                        <h2
                            className="text-xl font-semibold text-teal-400 cursor-pointer"
                            onClick={() => handleOpenPlaylist(playlist.id)}
                        >
                            {playlist.name}
                        </h2>
                        <button
                            onClick={() => handleDelete(playlist.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                    <ul className="mt-4">
                        {playlist.top_songs.map((song) => (
                            <li
                                key={song.id}
                                className="flex items-center mb-2"
                            >
                                <img
                                    src={song.album_cover_url}
                                    alt={song.name}
                                    className="w-10 h-10 rounded-md mr-4"
                                />
                                <div>
                                    <p className="text-sm font-medium">
                                        {song.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {song.artist}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {selectedPlaylist && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                    <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-3xl relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                        >
                            Close
                        </button>
                        <h2 className="text-2xl font-semibold text-teal-400 mb-4">
                            {selectedPlaylist.name}
                        </h2>
                        <div className="max-h-[32rem] overflow-y-auto">
                            <ul className="space-y-4">
                                {selectedPlaylist.songs.map((track) => (
                                    <li
                                        key={track.id}
                                        className="flex items-start bg-gray-700 rounded-lg p-4 shadow-md"
                                    >
                                        <img
                                            src={
                                                track.album_cover_url ||
                                                "/default-album-cover.jpg"
                                            }
                                            alt={track.name}
                                            className="w-20 h-20 rounded-md object-cover mr-4"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-teal-400">
                                                {track.name}
                                            </h3>
                                            <p className="text-gray-400">
                                                Artist:{" "}
                                                {track.artist || "Unknown"}
                                            </p>
                                            {track.preview_url ? (
                                                <audio
                                                    src={track.preview_url}
                                                    controls
                                                    className="mt-2 w-full"
                                                />
                                            ) : (
                                                <a
                                                    href={track.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="z-50 mt-2 text-sm text-teal-500 underline"
                                                >
                                                    Listen on Spotify
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Playlists;
