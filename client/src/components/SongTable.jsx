import React, {useEffect, useState} from "react";
import api from "../api.js";
import {formatDate} from "../utils/utils.js";

function SongRow({ song }) {
    const [composerData, setComposerData] = useState(null);

    useEffect(() => {
        const fetchComposerData = async () => {
            const response = await api.get("song/" + song.id + "/composer");
            setComposerData(response.data[0]);
        };

        fetchComposerData();
    }, [song.id]);

    let composerName = "Loading...";
    if(composerData) {
        if (composerData.first_name) {
            composerName = `${composerData.first_name} ${composerData.last_name}`;
        }
        else {
            composerName = composerData.last_name;
        }
    }

    const [arrangerData, setArrangerData] = useState(null);
    const [arrangerDataLoading, setArrangerDataLoading] = useState(true);

    useEffect(() => {
        const fetchArrangerData = async () => {
            const response = await api.get("song/" + song.id + "/arranger");
            setArrangerData(response.data[0]);
            setArrangerDataLoading(false);
        };

        fetchArrangerData();
    }, [song.id]);

    let arrangerName = "Loading...";
    if(!arrangerDataLoading) {
        if (!arrangerData) {
            arrangerName = "Not specified.";
        }
        else if (arrangerData.first_name) {
            arrangerName = `${arrangerData.first_name} ${arrangerData.last_name}`;
        }
        else if (arrangerData.last_name) {
            arrangerName = arrangerData.last_name;
        }
    }

    return (
        <tr>
            <td>{song.title}</td>
            <td>{composerName}</td>
            <td>{arrangerName}</td>
            <td>{song.part}</td>
            <td>{formatDate(song.date_added)}</td>
        </tr>
    )
}

export default function SongTable({ songs }) {
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Song
                        </th>
                        <th>
                            Composer
                        </th>
                        <th>
                            Arranger
                        </th>
                        <th>
                            Part
                        </th>
                        <th>
                            Date added
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <SongRow key={song.id} song={song} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};