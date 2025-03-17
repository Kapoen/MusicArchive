import React from "react";
import api from "../api.js";
import {useSongs} from "../utils/SongContext.jsx";

export default function AddSongForm() {
    const { fetchSongs } = useSongs();

    const addSong = async (formData) => {
        const title = formData.get("title");
        const composer = formData.get("composer");
        const composerF = composer.split(" ").length > 0 ? composer.split(" ")[0] : null;
        const composerL = composer.split(" ").length > 1 ? composer.split(" ", 2)[1] : null;
        const arranger = formData.get("arranger");
        const arrangerF = arranger.split(" ").length > 0 ? arranger.split(" ")[0] : null;
        const arrangerL = arranger.split(" ").length > 1 ? arranger.split(" ", 2)[1] : null;
        const part = formData.get("part");
        const date = new Date().toISOString();

        const response = await api.post("addSong", {title, composerF, composerL, arrangerF, arrangerL, part, date});
        if (response.status === 201) {
            fetchSongs();
        }
    }

    return (
        <div className="bg-delft-blue text-ghost-white-dark text-lg p-1 w-2/5 h-fit rounded-lg flex justify-center items-center">
            <form action={addSong} className="space-y-2 w-full">
                <div className="flex items-center w-full pl-4 pr-4 pt-4">
                    <label htmlFor="title" className="w-1/4">Title:</label>
                    <input type="text" id="title" name="title" required={true} className="text-jet rounded-lg flex-1 pl-1 pr-1"/>
                </div>
                <div className="flex items-center w-full pl-4 pr-4">
                    <label htmlFor="composer" className="w-1/4">Composer:</label>
                    <input type="text" id="composer" name="composer" className="text-jet rounded-lg flex-1 pl-1 pr-1"/>
                </div>
                <div className="flex items-center w-full pl-4 pr-4">
                    <label htmlFor="arranger" className="w-1/4">Arranger:</label>
                    <input type="text" id="arranger" name="arranger" className="text-jet rounded-lg flex-1 pl-1 pr-1"/>
                </div>
                <div className="flex items-center w-full pl-4 pr-4">
                    <label htmlFor="part" className="w-1/4">Part:</label>
                    <input type="text" id="part" name="part" required={true} className="text-jet rounded-lg flex-1 pl-1 pr-1"/>
                </div>
                <div className="flex justify-center items-center w-full p-4">
                    <button type="submit" className="bg-vanilla text-jet rounded-lg w-24">Add song</button>
                </div>
            </form>
        </div>
    )
}