import express from "express";
import Song from "../models/song.js";

const router = express.Router();

router.get("/songs", async (req, res) => {
    try {
        const songs = await Song.getAllSongs();
        return res.status(200).json(songs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unable to get songs" });
    }
});

router.get("/:songId", async (req, res) => {
    const { songId } = req.params;
    if (!songId) {
        return res.status(404).json({ error: "Missing song ID." });
    }

    try {
        const song = await Song.getSongById(parseInt(songId));
        if (!song) {
            return res.status(404).json({ error: "Song not found." });
        }
        return res.status(200).json(song);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unable to get song." });
    }
});

router.get("/search/:title", async (req, res) => {
    const { title } = req.params;
    if (!title) {
        return res.status(404).json({ error: "Missing title." });
    }

    try {
        const song = await Song.searchSongByTitle(title);
        if (!song) {
            return res.status(404).json({ error: "Song not found." });
        }
        return res.status(200).json(song);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unable to get song." });
    }
});

router.get("/:songID/composer", async (req, res) => {
    const { songID } = req.params;
    if (!songID) {
        return res.status(404).json({ error: "Missing songID" });
    }

    try {
        const composer = await Song.searchComposerBySong(parseInt(songID));
        if (!composer) {
            return res.status(404).json({ error: "Composer not found." });
        }
        return res.status(200).json(composer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unable to get composer. "});
    }
});

router.get("/:songID/arranger", async (req, res) => {
    const { songID } = req.params;
    if (!songID) {
        return res.status(404).json({ error: "Missing songID" });
    }

    try {
        const arranger = await Song.searchArrangerBySong(parseInt(songID));
        if (!arranger) {
            return res.status(404).json({ error: "Arranger not found." });
        }
        return res.status(200).json(arranger);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unable to get arranger. "});
    }
});

export default router;