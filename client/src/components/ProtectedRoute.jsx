import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";
import api from "../api.js";
import {useEffect, useState} from "react";

export default function ProtectedRoute() {
    const { token } = useAuth();
    const [load, setLoad] = useState(null);

    if (!token) {
        return <Navigate to="/MusicArchive/login"/>;
    }

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response =  await api.get("auth/verify", {
                    headers: {
                        "Authorization": `Bearer: ${token}`
                    }
                });

                if (response.status === 200) {
                    return setLoad(<Outlet />);
                }

                return <Navigate to="/MusicArchive/login" />;
            } catch (error) {
                if (!error.response) {
                    console.log("Network error: " + error);
                    return setLoad(<Navigate to="/MusicArchive/login"/>);
                }

                if (error.response.status === 401) {
                    console.log("Token verification failed: Unauthorized");
                    return setLoad(<Navigate to="/MusicArchive/login"/>);
                }

                console.log("An error occurred: " + error.response.status);
                return setLoad(<Navigate to="/MusicArchive/login"/>);
            }
        };

        verifyToken();
    }, [token]);

    return load;
};
