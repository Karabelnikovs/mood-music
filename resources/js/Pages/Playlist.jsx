import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Playlist = ({ playlist }) => {
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [playlistName, setPlaylistName] = useState("");

    const handleCheckboxChange = (trackId) => {
        setSelectedTracks((prev) =>
            prev.includes(trackId)
                ? prev.filter((id) => id !== trackId)
                : [...prev, trackId]
        );
    };

    const handleCreatePlaylist = () => {
        setShowModal(true);
    };

    const confirmCreatePlaylist = () => {
        Inertia.post("/playlists/create", {
            tracks: selectedTracks,
            name: playlistName,
        });
        setShowModal(false);
        setPlaylistName("");
    };

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

            <h1 className="text-3xl font-bold mb-8 text-center">
                Generated Playlist
            </h1>

            {sortedPlaylist.length ? (
                <ul className="w-full max-w-2xl space-y-6">
                    {sortedPlaylist.map((track) => (
                        <li
                            key={track.id}
                            className="flex items-start bg-gray-800 rounded-lg p-4 shadow-md"
                        >
                            <img
                                src={
                                    track.album?.images?.[0]?.url ||
                                    "/default-album-cover.jpg"
                                }
                                alt="Album cover"
                                className="w-20 h-20 rounded-md object-cover mr-4"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-teal-400">
                                    {track.name}
                                </h3>

                                {/* Display the artist's name */}
                                <p className="text-gray-400">
                                    Artist: {track.artists?.[0]?.name || "Unknown"}
                                </p>

                                {/* Check if preview URL exists */}
                                {track.preview_url ? (
                                    <audio
                                        src={track.preview_url}
                                        controls
                                        className="mt-2 w-full"
                                    />
                                ) : (
                                    <div className="mt-2 text-sm text-gray-500 italic">
                                        Preview not available
                                    </div>
                                )}

                                <div className="mt-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox text-teal-500"
                                            onChange={() =>
                                                handleCheckboxChange(track.id)
                                            }
                                            checked={selectedTracks.includes(
                                                track.id
                                            )}
                                        />
                                        <span className="ml-2">
                                            Select this song
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 text-center mt-6">
                    No tracks available. Try generating a playlist with a
                    different mood or genre.
                </p>
            )}

            {playlist.length > 0 && selectedTracks.length > 0 && (
                <button
                    onClick={handleCreatePlaylist}
                    className="mt-6 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                >
                    Create Playlist
                </button>
            )}

            {/* Playlist Name Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Enter Playlist Name
                        </h2>
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Playlist name"
                            className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmCreatePlaylist}
                                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-md"
                                disabled={!playlistName.trim()}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Playlist;
