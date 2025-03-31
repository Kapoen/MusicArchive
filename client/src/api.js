import axios from "axios";

const api = axios.create({
    baseURL: "https://kapoen.github.io/MusicArchive/",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;