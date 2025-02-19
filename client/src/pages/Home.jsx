import React, {useEffect, useState} from "react";
import { message } from "antd";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";

import api from "../api.js";

export default function Home() {
    const [songs, setSongs] = useState([]);


    const fetchSongs = async () => {
        try {
            const response = await api.get("/song/songs");
            const songList = response.data;

            const composersPromise = songList.map(async (song) => {
                const composerResponse = await api.get(`/song/${song.id}/composer`);
                return composerResponse.data[0];
            });
            const composers = await Promise.all(composersPromise);

            const arrangersPromise = songList.map(async (song) => {
                const arrangerResponse = await api.get(`/song/${song.id}/arranger`);
                return arrangerResponse.data[0] || "";
            })
            const arrangers = await Promise.all(arrangersPromise);

            const songsExpanded = songList.map((song, index) => ({
                ...song,
                composer: composers[index],
                arranger: arrangers[index]
            }))

            setSongs(songsExpanded)

        } catch (err) {
            message.error("Error fetching song lists");
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <Layout>
            <SongTable songs={songs} />
        </Layout>
    );
};