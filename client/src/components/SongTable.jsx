import React, {useEffect, useState} from "react";
import api from "../api.js";
import {formatDate, getNameString} from "../utils/utils.js";

function SongRow({ song }) {
    const composerName = getNameString(song.composer)
    const arrangerName = getNameString(song.arranger)

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
    const [filteredSongs, setFilteredSongs] = useState(songs);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        if (searchInput === "") {
            setFilteredSongs(songs);
        }
        else {
            const fetchSongs = async () => {
                const response = await api.get("song/search/" + searchInput);
                setFilteredSongs(response.data);
            }

            fetchSongs();
        }

    }, [searchInput, songs]);

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const [sortConfig, setSortConfig] = useState({
        column: "title",
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

    if (songs.length === 0) {
        return (
            <div>
                No songs have been added yet.
            </div>
        )
    }

    return(
        <div className="shadow-md w-5/6 h-3/4 mx-auto">
            <input type="text" value={searchInput} onChange={handleSearch} />
            <table className="min-w-full table-auto border-collapse border border-jet">
                <thead>
                    <tr className="bg-delft-blue border-jet text-ghost-white-dark">
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("title")}>
                                {sortConfig.column === "title" ?
                                    (sortConfig.direction === "asc" ? "Title \u2b61" : "Title \u2b63") : "Title"}
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("composer")}>
                                {sortConfig.column === "composer" ?
                                    (sortConfig.direction === "asc" ? "Composer \u2b61" : "Composer \u2b63") : "Composer"}
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("arranger")}>
                                {sortConfig.column === "arranger" ?
                                    (sortConfig.direction === "asc" ? "Arranger \u2b61" : "Arranger \u2b63") : "Arranger"}
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("part")}>
                                {sortConfig.column === "part" ?
                                    (sortConfig.direction === "asc" ? "Part \u2b61" : "Part \u2b63") : "Part"}
                            </div>
                        </th>
                        <th className="px-6 py-3 min-w-36 text-left border-b border-jet">
                            <div className="hover:cursor-pointer"
                                 onClick={() => sortSongs("date_added")}>
                                {sortConfig.column === "date_added" ?
                                    (sortConfig.direction === "asc" ? "Date added \u2b61" : "Date added \u2b63") : "Date added"}
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
            <div className="overflow-y-scroll max-h-[73vh]">
                <table id="songDataTable" className="min-w-full table-auto border-collapse border border-jet">
                    <tbody>
                        {filteredSongs.map((song) => (
                            <SongRow key={song.id} song={song} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};