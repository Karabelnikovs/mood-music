import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const Index = () => {
    const { errors, emotions } = usePage().props;
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        router.post(route("face.analysis.analyze"), formData, {
            forceFormData: true,
            onSuccess: (page) => {
                if (page.props.analysis) {
                    console.log(page.props.analysis);
                }
            },
        });
    };
    if (emotions) {
        console.log(emotions);
    }
    return (
        <div>
            <h2>Emotion Analysis</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                />
                <button type="submit">Analyze Emotions</button>
            </form>
            {errors.image && <p className="error">{errors.image}</p>}
        </div>
    );
};

export default Index;
