import React, {useEffect, useState} from "react";
import { message } from "antd";

import Layout from "../components/Layout.jsx";
import SongTable from "../components/SongTable.jsx";

import api from "../api.js";

export default function Home() {
    const [songLists, setSongLists] = useState([]);


    const fetchSongs = async () => {
        try {
            const response = await api.get("/song/songs");
            setSongLists(response.data);
        } catch (err) {
            message.error("Error fetching song lists");
        }
    };

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <Layout>
            <SongTable songs={songLists} />
        </Layout>
    );
};