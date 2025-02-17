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
        <tr className="odd:bg-ghost-white-dark even:bg-vanilla">
            <td className="px-6 py-3">{song.title}</td>
            <td className="px-6 py-3">{composerName}</td>
            <td className="px-6 py-3">{arrangerName}</td>
            <td className="px-6 py-3">{song.part}</td>
            <td className="px-6 py-3">{formatDate(song.date_added)}</td>
        </tr>
    )
}

export default function SongTable({ songs }) {
    return(
        <div className="shadow-md w-3/4 mx-auto">
            <table className="min-w-full table-auto border-collapse border border-jet">
                <thead>
                    <tr className="bg-delft-blue-light border-jet text-ghost-white-dark">
                        <th className="px-6 py-3 text-left border-b border-jet">
                            Song
                        </th>
                        <th className="px-6 py-3 text-left border-b border-jet">
                            Composer
                        </th>
                        <th className="px-6 py-3 text-left border-b border-jet">
                            Arranger
                        </th>
                        <th className="px-6 py-3 text-left border-b border-jet">
                            Part
                        </th>
                        <th className="px-6 py-3 text-left border-b border-jet">
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