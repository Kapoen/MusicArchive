import React, {useEffect, useState} from "react";

import Layout from "../components/Layout.jsx";
import { useAuth } from "../utils/AuthContext.jsx";

import {Avatar, message} from "antd";
import {TiUserOutline} from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import api from "../api.js";

export default function Profile() {
    const { userID, setToken } = useAuth();

    const [user, setUser] = useState({username: null, email: null, avatar: null});
    const [editingUsername, setEditingUsername] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);


    useEffect(() => {
        const fetchUser = async () => {
            const response = await api.get("user/" + userID);

            if (response.status !== 200) {
                return;
            }

            setUser({
                username: response.data[0].username,
                email: response.data[0].email,
                avatar: response.data[0].avatar
            });
        };

        fetchUser();
    }, [userID]);

    const handleInput = (event) => {
        const { name, value } = event.target;

        setUser((prevUser) => ({
            ...prevUser,
                [name]: value
        }))
    }

    const handleSave = async () => {
        if (user.username === "" || user.username === " "
            || user.email === "" || user.email === " ") {
            return message.error("Username and email may not be empty.");
        }

        const response = await api.put("user/" + userID, {
            username: user.username,
            email: user.email
        });

        if (response.status !== 200) {
            return message.error("Failed updating user.");
        }

        setToken(response.data.token);
    }

    return (
        <Layout>
            <div className="bg-delft-blue w-1/4 h-fit flex flex-col items-center justify-start p-8 rounded-xl shadow-xl space-y-6">
                <Avatar size={128} icon={<TiUserOutline />} className="mb-6" />

                <div className="bg-white text-jet text-xl font-medium py-3 px-6 rounded-full w-full flex items-center justify-between shadow-md">
                    <button
                        className={`text-xl ${editingUsername ? 'text-primary' : 'text-gray-500'} hover:text-primary transition duration-300`}
                        onClick={() => setEditingUsername((editing) => !editing)}
                    >
                        <MdEdit />
                    </button>
                    <input
                        name="username"
                        disabled={!editingUsername}
                        value={user.username || ""}
                        onChange={handleInput}
                        className={`bg-transparent text-jet text-center w-full outline-none border-2 transition duration-300 ${editingUsername ? 'border-primary' : 'border-transparent'}`}
                    />
                </div>

                <div className="bg-white text-jet text-xl font-medium py-3 px-6 rounded-full w-full flex items-center justify-between shadow-md">
                    <button
                        className={`text-xl ${editingEmail ? 'text-primary' : 'text-gray-500'} hover:text-primary transition duration-300`}
                        onClick={() => setEditingEmail((editing) => !editing)}
                    >
                        <MdEdit />
                    </button>
                    <input
                        name="email"
                        disabled={!editingEmail}
                        value={user.email || ""}
                        onChange={handleInput}
                        className={`bg-transparent text-jet text-center w-full outline-none border-2 transition duration-300 ${editingEmail ? 'border-primary' : 'border-transparent'}`}
                    />
                </div>

                <div className="w-full flex justify-between space-x-4 mt-6">
                    <button
                        className="bg-vanilla text-jet font-semibold py-2 px-6 rounded-full hover:bg-vanilla-dark transition duration-300 shadow-lg mt-6"
                        onClick={handleSave}
                    >
                        Save changes
                    </button>
                    <button
                        className="bg-vanilla text-jet font-semibold py-2 px-6 rounded-full hover:bg-vanilla-dark transition duration-300 shadow-lg mt-6"
                    >
                        Edit password
                    </button>
                </div>
            </div>
        </Layout>

    );
};