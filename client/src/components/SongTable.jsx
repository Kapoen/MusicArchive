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
        else if (!arrangerData.first_name) {
            arrangerName = arrangerData.last_name;
        }
        else if (!arrangerData.last_name) {
            arrangerName = arrangerData.first_name;
        }
        else {
            arrangerName = `${arrangerData.first_name} ${arrangerData.last_name}`
        }
    }

    return (
        <tr className="odd:bg-ghost-white-dark even:bg-vanilla">
            <td className="px-6 py-3 min-w-36">{song.title}</td>
            <td className="px-6 py-3 min-w-36">{composerName}</td>
            <td className="px-6 py-3 min-w-36">{arrangerName}</td>
            <td className="px-6 py-3 min-w-36">{song.part}</td>
            <td className="px-6 py-3 min-w-36">{formatDate(song.date_added)}</td>
        </tr>
    )
}

export default function SongTable({ songs }) {
    if (songs.length === 0) {
        return (
            <div>
                No songs have been added yet.
            </div>
        )
    }

    function sort(column) {
        const table = document.getElementById("songDataTable");
        const columns = ["song", "composer", "arranger", "part", "date"];
        const columnIndex = columns.findIndex(item => item === column);

        let rows, toSwitch, i, x, y;

        let asc = true;
        const thArray = document.getElementById(column).innerHTML.split(" ");
        if (thArray[thArray.length - 1] === "\u2b61") {
            asc = false;
            thArray[thArray.length - 1] = "\u2b63";
        }
        else if ((thArray.length > 1 && columnIndex !== 4) || thArray.length > 2) {
            thArray[thArray.length - 1] = "\u2b61";
        }

        if (!((thArray.length > 1 && columnIndex !== 4) || thArray.length > 2)) {
            thArray.push("\u2b61");
        }

        let sorting = true;
        while (sorting) {
            sorting = false;
            rows = table.rows;

            for (i = 0; i < (rows.length - 1); i++) {
                toSwitch = false;

                x = rows[i].getElementsByTagName("TD")[columnIndex];
                y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

                if (column === "date") {
                    x = x.innerHTML.split("/");
                    y = y.innerHTML.split("/")
                    const dateX = new Date(x[2], x[1], x[0]);
                    const dateY = new Date(y[2], y[1], y[0]);

                    if (asc && dateX > dateY) {
                        toSwitch = true;
                        break;
                    }

                    else if (!asc && dateX < dateY) {
                        toSwitch = true;
                        break
                    }
                }

                else if (asc && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    toSwitch = true;
                    break;
                }

                else if (!asc && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    toSwitch = true;
                    break;
                }
            }

            if (toSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                sorting = true;
            }
        }

        document.getElementById(column).innerHTML = thArray.toString()
            .replaceAll(",", " ");

        for (let j = 0; j < columns.length; j++) {
            const header = document.getElementById(columns[j]).innerHTML;
            const headerArray = header.split(" ")

            if (((headerArray.length > 1 && j !== 4) || headerArray.length > 2)
                && j !== columnIndex) {
                headerArray.pop();
                document.getElementById(columns[j]).innerHTML = headerArray.toString()
                    .replaceAll(",", " ");
            }
        }
    }

    return(
        <div className="shadow-md w-5/6 h-3/4 mx-auto">
            <table className="min-w-full table-auto border-collapse border border-jet">
                <thead>
                    <tr className="bg-delft-blue border-jet text-ghost-white-dark">
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer" id="song"
                                 onClick={() => sort("song")}>
                                Song
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer" id="composer"
                                 onClick={() => sort("composer")}>
                                Composer
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer" id="arranger"
                                 onClick={() => sort("arranger")}>
                                Arranger
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer" id="part"
                                 onClick={() => sort("part")}>
                                Part
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer" id="date"
                                 onClick={() => sort("date")}>
                                Date added
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
            <div className="overflow-y-scroll max-h-[73vh]">
                <table id="songDataTable" className="min-w-full table-auto border-collapse border border-jet">
                    <tbody>
                        {songs.map((song) => (
                            <SongRow key={song.id} song={song} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};