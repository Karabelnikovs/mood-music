import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

function Home() {
    const [emotion, setEmotion] = useState("");
    const [genre, setGenre] = useState("");

    const handleGeneratePlaylist = (e) => {
        e.preventDefault();
        Inertia.post("/generate-playlist", { emotion, genre });
    };

    return (
        <div className="bg-black h-screen">
            <Link
                href={route("logout")}
                method="post"
                as="button"
                className="absolute top-4 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
                Logout
            </Link>
            <a
                href={route("profile.edit")}
                method="post"
                as="button"
                className="absolute top-16 left-4 font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
            >
                Profile
            </a>
            <div className="h-full flex flex-col items-center justify-center">
                <h1>Create a Playlist Based on Your Emotion</h1>
                <form
                    onSubmit={handleGeneratePlaylist}
                    className="h-full flex flex-col items-center justify-center text-white/50 gap-4 w-full"
                >
                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 min-w-64">
                        <div className="flex justify-between">
                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                                Emotion
                            </label>
                        </div>
                        <input
                            className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                            type="text"
                            placeholder="Emotion"
                            value={emotion}
                            onChange={(e) => setEmotion(e.target.value)}
                        />
                    </div>

                    <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30 min-w-64">
                        <div className="flex justify-between">
                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                                Genre
                            </label>
                        </div>
                        <input
                            className="text-white block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                            type="text"
                            placeholder="Genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                    >
                        Generate Playlist
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Home;
