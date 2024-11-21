import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Home = () => {
    const [emotion, setEmotion] = useState("happy");
    const [genre, setGenre] = useState("pop");

    const generatePlaylist = (event) => {
        event.preventDefault();
        // Update the route URL here
        Inertia.post("/generate-playlist", { emotion, genre });
    };

    return (
<<<<<<< HEAD
        <div className="bg-black h-screen flex flex-col items-center justify-center text-white p-4 relative">
            {/* Logout Button */}
            <button
                onClick={() => Inertia.post(route("logout"))}
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-white text-black h-10 px-4 py-2"
=======
        <div className="bg-black h-screen">
            <Head title="Home" />
            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
>>>>>>> 40bc6e719381058020edf554748f14b88ba406b6
            >
                Logout
            </button>
            
            {/* Profile Button */}
            <button
                onClick={() => Inertia.visit(route("profile.edit"))}
                className="absolute top-16 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-white text-black h-10 px-4 py-2"
            >
                Profile
            </button>

            <h1 className="text-3xl font-bold mb-8 text-center">Generate a Playlist</h1>
            <form onSubmit={generatePlaylist} className="w-full max-w-md flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="emotion" className="text-sm font-semibold text-gray-300">Select Mood:</label>
                    <select
                        id="emotion"
                        value={emotion}
                        onChange={(e) => setEmotion(e.target.value)}
                        required
                        className="bg-gray-800 text-white p-2 rounded-md focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="happy">Happy</option>
                        <option value="relaxed">Relaxed</option>
                        <option value="energetic">Energetic</option>
                        <option value="sad">Sad</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="genre" className="text-sm font-semibold text-gray-300">Select Genre:</label>
                    <select
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="bg-gray-800 text-white p-2 rounded-md focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="pop">Pop</option>
                        <option value="jazz">Jazz</option>
                        <option value="rock">Rock</option>
                        <option value="classical">Classical</option>
                        <option value="rap">Rap</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="mt-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-white text-black h-10 px-4 py-2"
                >
                    Generate Playlist
                </button>
            </form>
        </div>
    );
};

export default Home;
