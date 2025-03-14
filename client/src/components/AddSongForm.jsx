import React from "react";
import api from "../api.js";
import {useSongs} from "../utils/SongContext.jsx";

export default function AddSongForm() {
    const { fetchSongs } = useSongs();

    const addSong = async (formData) => {
        const title = formData.get("title");
        let composerF = formData.get("composerF");
        if (composerF === "") {
            composerF = null;
        }
        let composerL = formData.get("composerL");
        if (composerL === "") {
            composerL = null;
        }
        let arrangerF = formData.get("arrangerF");
        if (arrangerF === "") {
            arrangerF = null;
        }
        let arrangerL = formData.get("arrangerL");
        if (arrangerL === "") {
            arrangerL = null;
        }
        const part = formData.get("part");

        const date = new Date().toISOString();

        const response = await api.post("addSong", {title, composerF, composerL, arrangerF, arrangerL, part, date});
        if (response.status === 201) {
            fetchSongs();
        }
    }

    return (
        <div>
            <form action={addSong}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required={true}/> <br />
                <label htmlFor="composerF">Composer first name:</label>
                <input type="text" id="composerF" name="composerF"/> <br />
                <label htmlFor="composerL">Composer last name:</label>
                <input type="text" id="composerL" name="composerL"/> <br />
                <label htmlFor="arrangerF">Arranger first name:</label>
                <input type="text" id="arrangerF" name="arrangerF"/> <br />
                <label htmlFor="arrangerL">Arranger last name:</label>
                <input type="text" id="arrangerL" name="arrangerL"/> <br />
                <label htmlFor="part">Part:</label>
                <input type="text" id="part" name="part" required={true}/> <br />
                <button type="submit">Add song</button>
            </form>
        </div>
    )
}