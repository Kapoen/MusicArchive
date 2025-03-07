import React from "react";

import api from "../api.js";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";
import { useSongs } from "../utils/SongContext.jsx";

export default function EditSong() {
    const { songs } = useSongs();

    const handleSave = async (songID, title, composerName, arrangerName, part) => {
        if (composerName === "Not specified." || composerName === "") {
            composerName = null;
        }

        const composer = composerName == null ? null : composerName.split(" ", 2);
        const composerF = (composer != null && composer.length > 0) ? composer[0] : null;
        const composerL = (composer != null && composer.length > 1) ? composer[1] : null;
        const composerResult = await api.get("song/" + songID + "/composer");
        if (composerResult.data.length > 0) {
            console.log(composerResult.data)
            if (composerF === null && composerL === null) {
                const deleteComposerLink = await api.delete("deleteComposerLink/" + songID);
            } else {
                const composerID = composerResult.data[0].composer_id;
                const updateComposer = await api.put("composer/" + composerID, {composerF, composerL});
            }
        }
        else {
            if (composerF !== null) {
                const createComposer = await api.post("composer", {composerF, composerL});
                if (createComposer.status === 200) {
                    const composerID = createComposer.data[0].id;
                    const createComposerLink = await api.post("linkComposer", {songID, composerID});
                }
            }
        }

        if (arrangerName === "Not specified." || arrangerName === "") {
            arrangerName = null;
        }

        const arranger = arrangerName == null ? null : arrangerName.split(" ", 2);
        const arrangerF = (arranger != null && arranger.length > 0) ? arranger[0] : null;
        const arrangerL = (arranger != null && arranger.length > 1) ? arranger[1] : null;
        const arrangerResult = await api.get("song/" + songID + "/arranger");
        if (arrangerResult.data.length > 0) {
            if (arrangerF === null && arrangerL === null) {
                const deleteArrangerLink = await api.delete("deleteArrangerLink/" + songID);
            } else {
                const arrangerID = arrangerResult.data[0].arranger_id;
                const updateArranger = await api.put("arranger/" + arrangerID, {arrangerF, arrangerL});
            }
        }
        else {
            if (arrangerF !== null) {
                const createArranger = await api.post("arranger", {arrangerF, arrangerL});
                if (createArranger.status === 200) {
                    const arrangerID = createArranger.data[0].id;
                    const createArrangerLink = await api.post("linkArranger", {songID, arrangerID});
                }
            }
        }

        const updateSong = await api.put("song/" + songID, {title, part});
    }

    return (
        <Layout>
            <SongTable songs={songs} editSongs={true} handleSave={handleSave} deleteSongs={false}/>
        </Layout>
    );
};