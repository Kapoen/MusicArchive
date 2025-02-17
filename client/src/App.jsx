import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AddSong from "./pages/AddSong.jsx";

import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AddSong" element={<AddSong />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;