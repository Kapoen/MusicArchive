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
                        <Route path="/MusicArchive/login" element={<Login />} />
                        <Route path="/MusicArchive/register" element={<Register />} />
                        <Route path="/MusicArchive" element={<ProtectedRoute />}>
                            <Route path="/MusicArchive" element={<Home />} />
                            <Route path="/MusicArchive/addSong" element={<AddSong />} />
                            <Route path="/MusicArchive/deleteSong" element={<DeleteSong />} />
                            <Route path="/MusicArchive/editSong" element={<EditSong />} />
                            <Route path="/MusicArchive/profile" element={<Profile />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/MusicArchive" replace />} />
                    </Routes>
                </BrowserRouter>
            </SongProvider>
        </AuthProvider>
    );
};

export default App;