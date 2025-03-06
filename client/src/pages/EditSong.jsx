import React from "react";

import api from "../api.js";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";
import { useSongs } from "../utils/SongContext.jsx";

export default function EditSong() {
    const { songs } = useSongs();

    const handleSave = async (songID, title, composerName, arrangerName, part) => {
        if (composerName === "Not specified.") {
            composerName = null;
        }

        const composer = composerName == null ? null : composerName.split(" ", 2);
        const composerF = (composer != null && composer.length > 0) ? composer[0] : null;
        const composerL = (composer != null && composer.length > 1) ? composer[1] : null;
        const composerResult = await api.get("song/" + songID + "/composer");
        if (composerResult.data.length > 0) {
            const composerID = composerResult.data[0].composer_id;
            const updateComposer = await api.put("composer/" + composerID, {composerF, composerL})
        }

        if (arrangerName === "Not specified.") {
            arrangerName = null;
        }

        const arranger = arrangerName == null ? null : arrangerName.split(" ", 2);
        const arrangerF = (arranger != null && arranger.length > 0) ? arranger[0] : null;
        const arrangerL = (arranger != null && arranger.length > 1) ? arranger[1] : null;
        const arrangerResult = await api.get("song/" + songID + "/arranger");
        if (arrangerResult.data.length > 0) {
            const arrangerID = arrangerResult.data[0].arranger_id;
            const updateArranger = await api.put("arranger/" + arrangerID, {arrangerF, arrangerL})
        }

        const updateSong = await api.put("song/" + songID, {title, part});
    }

    return (
        <Layout>
            <SongTable songs={songs} editSongs={true} handleSave={handleSave} deleteSongs={false}/>
        </Layout>
    );
};