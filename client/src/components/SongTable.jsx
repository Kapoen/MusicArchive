import React, {useEffect, useState} from "react";
import api from "../api.js";
import {formatDate, getNameString} from "../utils/utils.js";
import {useSongs} from "../utils/SongContext.jsx";

function SongRow({ song, editSongs, editing, setEditing, handleSave, deleteSongs, selectedSongs, handleSelect }) {
    const composerName = getNameString(song.composer);
    const arrangerName = getNameString(song.arranger);

    const [editedTitle, setEditedTitle] = useState(song.title);
    const [editedComposer, setEditedComposer] = useState(composerName);
    const [editedArranger, setEditedArranger] = useState(arrangerName);
    const [editedPart, setEditedPart] = useState(song.part);

    const { fetchSongs } = useSongs();

    return (
        <tr className="odd:bg-ghost-white-dark even:bg-vanilla w-full">
            {editSongs && (
                <td className="px-6 py-3 w-2">
                    {editing !== song.id ? (
                        <button
                            aria-label="Edit song"
                            onClick={() => setEditing(song.id)}
                        >
                            {"\u270E"}
                        </button>
                    ) : (
                        <>
                            <button
                                className="w-1 pr-2"
                                aria-label="Save changes"
                                onClick={async () => {
                                    await handleSave(song.id, editedTitle, editedComposer, editedArranger, editedPart);
                                    setEditing(null);
                                    fetchSongs();
                                }}
                            >
                                {"\u2714"}
                            </button>
                            <button
                                className="w-1 pl-2"
                                aria-label="Cancel"
                                onClick={() => setEditing(null)}
                            >
                                {"\u2716"}
                            </button>
                        </>
                    )}
                </td>
            )}
            <td className="px-6 py-3 w-36">{editing === song.id ? (<input type="text" defaultValue={song.title} onChange={(event) => setEditedTitle(event.target.value)}/>) : (song.title)}</td>
            <td className="px-6 py-3 w-36">{editing === song.id ? (<input type="text" defaultValue={composerName} onChange={(event) => setEditedComposer(event.target.value)}/>) : (composerName)}</td>
            <td className="px-6 py-3 w-36">{editing === song.id ? (<input type="text" defaultValue={arrangerName} onChange={(event) => setEditedArranger(event.target.value)}/>) : (arrangerName)}</td>
            <td className="px-6 py-3 w-36">{editing === song.id ? (<input type="text" defaultValue={song.part} onChange={(event) => setEditedPart(event.target.value)}/>) : (song.part)}</td>
            <td className="px-6 py-3 w-36">{formatDate(song.date_added)}</td>
            {deleteSongs &&
                <td className="px-6 py-3 w-1">
                    <input type="checkbox"
                           checked={selectedSongs.includes(song.id)}
                           onChange={() => handleSelect(song.id)}
                           aria-label="Select song"
                    />
                </td>
            }
        </tr>
    )
}

export default function SongTable({ songs, userID, editSongs, handleSave, deleteSongs }) {
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (searchInput === "") {
            setFilteredSongs(songs);
        }
        else {
            const fetchSongs = async () => {
                const response = await api.get("song/search/" + searchInput, {
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
                setFilteredSongs(songsExpanded);
            }

            fetchSongs();
        }

    }, [searchInput, songs]);

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const [sortConfig, setSortConfig] = useState({
        column: "",
        direction: "asc"
    });

    const sortSongs = (column) => {
        let direction = "asc";
        if (sortConfig.column === column && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedSongs = [...filteredSongs].sort((a, b) => {
            if (column === "date_added") {
                const timeA = new Date(a[column]).getTime();
                const timeB = new Date(b[column]).getTime();

                if (timeA < timeB) {
                    return direction === "asc" ? -1 : 1;
                }

                if (timeA > timeB) {
                    return direction === "desc" ? 1 : -1;
                }

                return 0;
            }

            let stringA, stringB;
            if (column === "composer" || column === "arranger") {
                stringA = getNameString(a[column]).toLowerCase();
                stringB = getNameString(b[column]).toLowerCase();
            }
            else {
                stringA = a[column].toLowerCase();
                stringB = b[column].toLowerCase();
            }

            if (stringA < stringB) {
                return direction === "asc" ? -1 : 1;
            }

            if (stringA > stringB) {
                return direction === "asc" ? 1 : -1;
            }

            return 0;
        });

        setSortConfig({ column: column, direction: direction});
        setFilteredSongs(sortedSongs);
    };

    const [selectedSongs, setSelectedSongs] = useState([]);
    const selectAll = () => {
        if (selectedSongs.length === filteredSongs.length) {
            setSelectedSongs([]);
        } else {
            setSelectedSongs(filteredSongs.map(song => song.id));
        }
    }

    const { fetchSongs } = useSongs();
    const handleSelect = (songID) => {
        setSelectedSongs((currSelected) =>
            currSelected.includes(songID)
                ? currSelected.filter((song) => song !== songID)
                : [...currSelected, songID]
        );
    }

    const deleteSelected = async () => {
        for (const songID of selectedSongs) {
            const response = await api.delete("deleteSong/" + songID);
            if (response.status === 204) {
                setSelectedSongs((currSelected) =>
                    currSelected.filter((song) => song !== songID)
                );
                setFilteredSongs((currFiltered) =>
                    currFiltered.filter((song) => song.id !== songID)
                );
            }
        }
        fetchSongs();
    }

    const [editing, setEditing] = useState(null);

    if (songs.length === 0) {
        return (
            <div>
                No songs have been added yet or the table is loading.
            </div>
        )
    }

    return(
        <div className="shadow-md w-5/6 mx-auto">
            <input type="text" value={searchInput} onChange={handleSearch} />
            <table className="min-w-full table-auto border-collapse border border-jet">
                <thead>
                    <tr className="bg-delft-blue border-jet text-ghost-white-dark">
                        {
                            editSongs
                                ? <th className="px-6 py-3 w-1"/>
                                : ""
                        }
                        <th className="px-6 py-3 w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("title")}>
                                {sortConfig.column === "title" ?
                                    (sortConfig.direction === "asc" ? "Title \u2b61" : "Title \u2b63") : "Title"}
                            </div>
                        </th>
                        <th className="px-6 py-3 w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("composer")}>
                                {sortConfig.column === "composer" ?
                                    (sortConfig.direction === "asc" ? "Composer \u2b61" : "Composer \u2b63") : "Composer"}
                            </div>
                        </th>
                        <th className="px-6 py-3 w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("arranger")}>
                                {sortConfig.column === "arranger" ?
                                    (sortConfig.direction === "asc" ? "Arranger \u2b61" : "Arranger \u2b63") : "Arranger"}
                            </div>
                        </th>
                        <th className="px-6 py-3 w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("part")}>
                                {sortConfig.column === "part" ?
                                    (sortConfig.direction === "asc" ? "Part \u2b61" : "Part \u2b63") : "Part"}
                            </div>
                        </th>
                        <th className="px-6 py-3 w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("date_added")}>
                                {sortConfig.column === "date_added" ?
                                    (sortConfig.direction === "asc" ? "Date added \u2b61" : "Date added \u2b63") : "Date added"}
                            </div>
                        </th>
                        {
                            deleteSongs
                                ? <th className="px-6 py-3 w-1 text-left border-b border-jet">
                                    <input type="checkbox"
                                           checked={selectedSongs.length === filteredSongs.length}
                                           onChange={selectAll}
                                    />
                                </th>
                                : ""
                        }
                    </tr>
                </thead>
            </table>
            <div className="overflow-y-scroll max-h-[73vh]">
                <table id="songDataTable" className="min-w-full table-auto border-collapse border border-jet">
                    <tbody>
                        {filteredSongs.map((song) => (
                            <SongRow key={song.id} song={song}
                                     editSongs={editSongs} deleteSongs={deleteSongs}
                                     selectedSongs={selectedSongs}
                                     handleSelect={handleSelect}
                                     editing={editing} setEditing={setEditing}
                                     handleSave={handleSave}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteSongs
                ? <button onClick={deleteSelected}>Delete selected</button>
                : ""
            }
        </div>
    );
};