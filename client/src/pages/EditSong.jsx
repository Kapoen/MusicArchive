import React from "react";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";
import { useSongs } from "../utils/SongContext.jsx";

export default function EditSong() {
    const { songs } = useSongs();

    return (
        <Layout>
            <SongTable songs={songs} editSongs={true} deleteSongs={false}/>
        </Layout>
    );
};