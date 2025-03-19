import React from "react";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";

import { useSongs } from "../utils/SongContext.jsx";
import {useAuth} from "../utils/AuthContext.jsx";

export default function Home() {
    const { songs } = useSongs();
    const { userID } = useAuth();

    return (
        <Layout>
            <SongTable songs={songs} userID={userID} editSongs={false} deleteSongs={false}/>
        </Layout>
    );
};