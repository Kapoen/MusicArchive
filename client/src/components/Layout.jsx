import React from "react";
import {NavLink} from "react-router-dom";

export default function Layout({ children }) {
    return (
        <main>
            <nav className="bg-delft-blue p-4 mb-8">
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
                </ul>
            </nav>
            {children}
        </main>
    );
};