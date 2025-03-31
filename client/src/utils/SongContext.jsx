import {createContext, useContext, useEffect, useState} from "react";
import api from "../api.js";
import {message} from "antd";
import {useAuth} from "./AuthContext.jsx";

const SongContext  = createContext();

export const useSongs = () => useContext(SongContext);

export const SongProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const { userID } = useAuth();

    const fetchSongs = async () => {
        try {
            if (userID === null) {
                return;
            }

            const response = await api.get("/song/songs", {
                params: { userID: userID }
            });

            const songsExpanded = response.data.map((song) => ({
                id: song.id,
                title: song.title,
                composer: {
                    first_name: song.c_first_name,
                    last_name: song.c_last_name
                },
                arranger: {
                    first_name: song.a_first_name,
                    last_name: song.a_last_name
                },
                part: song.part,
                date_added: song.date_added
            }))

            setSongs(songsExpanded)

        } catch (err) {
            message.error("Error fetching song lists");
        }
    };

    useEffect(() => {
        fetchSongs()
    }, [userID]);

    return (
        <SongContext.Provider value={{ songs, fetchSongs }}>
            {children}
        </SongContext.Provider>
    );
};