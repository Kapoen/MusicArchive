import React from "react";

import api from "../api.js";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";
import { useSongs } from "../utils/SongContext.jsx";

export default function EditSong() {
    const { songs } = useSongs();

    async function saveComposer(composerName, songID) {
        if (composerName === "Not specified." || composerName === "") {
            composerName = null;
        }

        const composer = composerName == null ? null : composerName.split(" ", 2);
        const composerF = (composer != null && composer.length > 0) ? composer[0] : null;
        const composerL = (composer != null && composer.length > 1) ? composer[1] : null;
        const composerResult = await api.get("song/" + songID + "/composer");
        
        if (composerResult.data.length > 0) {
            const deleteComposerLink = await api.delete("deleteComposerLink/" + songID);
        }

        if (composerF !== null) {
            let existingComposer = null;
            if (composerName !== null) {
                existingComposer = await api.get("/composer/search/" + composerName);
            }

            if (existingComposer === null) {
                const createComposer = await api.post("composer", {composerF, composerL});
                if (createComposer.status === 200) {
                    const composerID = createComposer.data[0].id;
                    const createComposerLink = await api.post("linkComposer", {songID, composerID});
                }
            }
            else {
                const composerID = existingComposer.data.id;
                const createComposerLink = await api.post("linkComposer", {songID, composerID})
            }
        }
    }

    async function saveArranger(arrangerName, songID) {
        if (arrangerName === "Not specified." || arrangerName === "") {
            arrangerName = null;
        }

        const arranger = arrangerName == null ? null : arrangerName.split(" ", 2);
        const arrangerF = (arranger != null && arranger.length > 0) ? arranger[0] : null;
        const arrangerL = (arranger != null && arranger.length > 1) ? arranger[1] : null;
        const arrangerResult = await api.get("song/" + songID + "/arranger");

        if (arrangerResult.data.length > 0) {
            const deleteArrangerLink = await api.delete("deleteArrangerLink/" + songID);
        }

        if (arrangerF !== null) {
            let existingArranger = null;
            if (arrangerName !== null) {
                existingArranger = await api.get("/composer/search/" + arrangerName);
            }

            if (existingArranger === null) {
                const createArranger = await api.post("arranger", {arrangerF, arrangerL});
                if (createArranger.status === 200) {
                    const arrangerID = createArranger.data[0].id;
                    const createArrangerLink = await api.post("linkArranger", {songID, arrangerID});
                }
            }
            else {
                const arrangerID = existingArranger.data.id;
                const createArrangerLink = await api.post("linkArranger", {songID, arrangerID})
            }
        }
    }

    const handleSave = async (songID, title, composerName, arrangerName, part) => {
        await saveComposer(composerName, songID);
        await saveArranger(arrangerName, songID);

        const updateSong = await api.put("song/" + songID, {title, part});
    }

    return (
        <Layout>
            <SongTable songs={songs} editSongs={true} handleSave={handleSave} deleteSongs={false}/>
        </Layout>
    );
};