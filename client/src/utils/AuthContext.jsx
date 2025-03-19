import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [username, setUsername_] = useState(null);
    const [userID, setUserID_] = useState(null);

    // Function to set the authentication token
    const setToken = (newToken) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            setUsername_(JSON.parse(atob(token.split(".")[1])).usr);
            setUserID_(JSON.parse(atob(token.split(".")[1])).uid)
        } else {
            localStorage.removeItem("token");
            setUsername_(null);
            setUserID_(null);
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            username,
            userID
        }),
        [token, username, userID]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
