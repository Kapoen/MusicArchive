import React from "react";
import {useNavigate} from "react-router-dom";

export default function ProfileDropdown() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/MusicArchive/login");
    }

    return (
        <div className="absolute flex flex-col border-2 border-t-0 border-jet rounded-b-lg bg-white shadow-lg">
            <button
                className="bg-vanilla w-full h-12 text-jet text-lg font-semibold hover:bg-vanilla-dark transition-all duration-200 ease-in-out border-b-2 border-jet rounded-t-lg"
                onClick={() => navigate("/MusicArchive/profile")}
            >
                Settings
            </button>
            <button
                className="bg-vanilla w-full h-12 text-jet text-lg font-semibold rounded-b-lg hover:bg-vanilla-dark transition-all duration-200 ease-in-out"
                onClick={logout}
            >
                Log out
            </button>
        </div>
    );
};