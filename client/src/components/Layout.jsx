import React from "react";
import {NavLink} from "react-router-dom";

export default function Layout({ children }) {
    return (
        <main className="h-screen">
            <nav className="bg-delft-blue p-4 max-h-1/6">
                <ul className="flex space-x-8 justify-center text-center text-xl">
                    <li>
                        <NavLink to="/" className={({ isActive }) => `
                            ${isActive ? "text-vanilla font-bold" : "text-ghost-white-dark"}
                        `}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/addSong" className={({ isActive }) => `
                            ${isActive ? "text-vanilla font-bold" : "text-ghost-white-dark"}
                        `}
                        >
                            Add song
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/deleteSong" className={({ isActive }) => `
                            ${isActive ? "text-vanilla font-bold" : "text-ghost-white-dark"}
                        `}
                        >
                            Delete song
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/editSong" className={({ isActive }) => `
                            ${isActive ? "text-vanilla font-bold" : "text-ghost-white-dark"}
                        `}
                        >
                            Edit song
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="flex justify-center items-center h-5/6 pt-4">
                {children}
            </div>
        </main>
    );
};