import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddSong from "./pages/AddSong.jsx";
import EditSong from "./pages/EditSong.jsx";

import "./App.css";
import { SongProvider } from "./utils/SongContext.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <SongProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AddSong" element={<AddSong />} />
                    <Route path="/EditSong" element={<EditSong />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </SongProvider>
        </BrowserRouter>
    );
};

export default App;