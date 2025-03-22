import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import AddSong from "./pages/AddSong.jsx";
import DeleteSong from "./pages/DeleteSong.jsx";
import EditSong from "./pages/EditSong.jsx";

import "./App.css";
import { SongProvider } from "./utils/SongContext.jsx";
import {AuthProvider} from "./utils/AuthContext.jsx";

const App = () => {
    return (
        <AuthProvider>
            <SongProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<ProtectedRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/addSong" element={<AddSong />} />
                            <Route path="/deleteSong" element={<DeleteSong />} />
                            <Route path="/editSong" element={<EditSong />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </SongProvider>
        </AuthProvider>
    );
};

export default App;