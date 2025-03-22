import React from "react";
import {useNavigate} from "react-router-dom";

export default function ProfileDropdown() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div className="absolute flex flex-col border-2 border-jet">
            <button className="bg-vanilla w-18 h-18 text-jet text-lg border-b-2 border-jet" onClick={() => navigate("/profile")}>Settings</button>
            <button className="bg-vanilla w-18 h-18 text-jet text-lg" onClick={logout}>Log out</button>
        </div>
    );
};