import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

function EmotionCapture() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("photo", selectedFile);

        Inertia.post("/emotion/analyze", formData, {
            onSuccess: (page) => {
                const emotion = page.props.emotion;
                alert(`Detected Emotion: ${emotion}`);
                // Use the detected emotion to fetch a Spotify playlist here
            },
        });
    };

    return (
        <div>
            <h2>Capture Emotion</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Analyze Emotion</button>
            </form>
        </div>
    );
}

export default EmotionCapture;
