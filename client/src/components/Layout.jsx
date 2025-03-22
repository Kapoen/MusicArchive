import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import {FiChevronDown} from "react-icons/fi";
import {useAuth} from "../utils/AuthContext.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";

export default function Layout({ children }) {
    const { username } = useAuth();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(currOpen => {
            return !currOpen
        });
    }

    return (
        <main className="h-screen w-screen">
            <div className="bg-delft-blue p-4 max-h-1/6 flex items-center justify-between w-full">
                <nav className="flex-1">
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
                <button className="bg-vanilla ml-auto" onClick={toggleDropdown}>
                    <span className="ml-2 text-xl text-jet flex justify-center items-center">{username}<FiChevronDown className='ml-2'/> </span>
                    <div className="w-full">
                        {
                            dropdownOpen && <ProfileDropdown />
                        }
                    </div>
                </button>
            </div>
            <div className="flex justify-center items-center h-5/6 pt-4">
                {children}
            </div>
        </main>
    );
};