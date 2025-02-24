import {createContext, useContext, useEffect, useState} from "react";
import api from "../api.js";
import {message} from "antd";

const SongContext  = createContext({ songs: [] });

export const useSongs = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
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
        fetchSongs()
    }, []);

    return (
        <SongContext.Provider value={{ songs }}>
            {children}
        </SongContext.Provider>
    );
};