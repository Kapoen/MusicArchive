import express from "express";
import Song from "../models/song.js";

const router = express.Router();

router.get("/songs", async (req, res) => {
    const { userID } = req.query;
    if (!userID) {
        return res.status(404).json({ error: "Missing user ID." });
    }

    try {
        const songs = await Song.getAllSongs(userID);
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

router.get("/search/:keyword", async (req, res) => {
    const { keyword } = req.params;
    const { userID } = req.query;

    if (!keyword || !userID) {
        return res.status(404).json({ error: "Missing keyword or user ID." });
    }

    try {
        const song = await Song.searchSong(keyword, userID);
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

router.put("/:songID", async (req, res) => {
    const { songID } = req.params;
    const { title, part } = req.body;

    if (!songID) {
        return res.status(404).json({ error: "Missing songID" });
    }

    try {
        const updated = await Song.updateSong(songID, title, part);
        if (!updated) {
            return res.status(500).json({ error: "Failed updating song" })
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred when updating song" })
    }
})

export default router;