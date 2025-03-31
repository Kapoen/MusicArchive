import React, { useState } from "react";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";
import { message } from "antd";
import { GiMusicalNotes } from "react-icons/gi";

const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({ username: "", password: "", email: "" });
    const { setToken } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post("user", values);
            // We make a request to the /auth/token endpoint with the username and password
            const response = await api.get("/auth/token", {
                params: values,
            });

            // If the response does not contain a token, we display an error message
            if (!response.data.token) {
                message.error("Auto login failed.");
                return navigate("/MusicArchive/login");
            }

            setToken(response.data.token); // Set the token in the AuthProvider
            navigate("/MusicArchive"); // Redirect to the home page
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                message.error(err.response.data.error);
            } else {
                message.error("Registering failed.");
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-4">
            <div className="bg-delft-blue w-full h-24 flex justify-center items-center absolute top-0" >
                <h1 className="text-3xl font-bold text-center text-ghost-white-dark transpare flex items-center gap-x-2">
                    Welcome to Music Archive! <GiMusicalNotes />
                </h1>
            </div>
            <div className=" bg-delft-blue w-1/4 h-fit flex flex-col items-center justify-evenly gap-y-4 rounded-lg drop-shadow-xl min-w-32">
                <div className="w-full text-2xl font-bold">
                    <button className="w-1/2 text-ghost-white-dark text-center" onClick={() => navigate("/login")}>Log in</button>
                    <button className="w-1/2 text-vanilla text-center" onClick={() => navigate("/register")}>Register</button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center gap-y-4">
                    <input type="text" placeholder="Username" required={true}
                           className="text-jet rounded-md pl-1 pr-1"
                           onChange={(e) =>
                               setValues({ ...values, username: e.target.value })
                           }
                    />
                    <input type="text" placeholder="Email" required={true}
                           className="text-jet rounded-md pl-1 pr-1"
                           onChange={(e) =>
                               setValues({ ...values, email: e.target.value })
                           }
                    />
                    <input type="password" placeholder="Password" required={true}
                           className="text-jet rounded-md pl-1 pr-1"
                           onChange={(e) =>
                               setValues({ ...values, password: e.target.value })
                           }
                    />
                    <button type="submit" className="bg-vanilla text-jet rounded-md w-24 self-center">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
