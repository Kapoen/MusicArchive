import express from "express";

import Song from "../models/song.js";
import Composer from "../models/composer.js";
import Arranger from "../models/arranger.js";
import ConnectTables from "../models/connectTables.js";

const router = express.Router();

router.post("/addSong", async (req, res) => {
    const { title, composerF, composerL, arrangerF, arrangerL, part, date, userID } = req.body;

    try {
        const song = await Song.addSong(title, part, date);
        const linkUser = await ConnectTables.connectUser(song[0].id, userID);
        if (!linkUser) {
            return res.status(500).json({ error: "Failed linking user with song." });
        }

        if (composerF != null || composerL != null) {
            let composer = await Composer.getComposerByName(composerF, composerL);
            if (!composer[0]) {
                composer = await Composer.addComposer(composerF, composerL);
            }

            if (!song || !composer) {
                return res.status(500).json({error: "Failed adding song or composer."});
            }

            const resultSTC = await ConnectTables.connectComposer(song[0].id, composer[0].id);
            if (!resultSTC) {
                return res.status(500).json({error: "Failed linking song with composer."});
            }
        }

        if (arrangerL != null || arrangerF != null) {
            let arranger = await Arranger.getArrangerByName(arrangerF, arrangerL);
            if (!arranger[0]) {
                arranger = await Arranger.addArranger(arrangerF, arrangerL);
            }

            if(!arranger) {
                return res.status(500).json({ error: "Failed adding arranger." });
            }

            const resultSTA = await ConnectTables.connectArranger(song[0].id, arranger[0].id);
            if (!resultSTA) {
               return res.status(500).json({ error: "Failed linking song with arranger." });
            }
        }

        return res.status(201).json(song);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error while creating song." });
    }
});

router.delete("/deleteSong/:songID", async (req, res) => {
    const { songID } = req.params;
    if (!songID) {
        return res.status(404).json({ error: "Missing songID" });
    }

    try {
        const deleteUserLink = await ConnectTables.deleteUserLink(songID);
        if (!deleteUserLink) {
            return res.status(500).json({ error: "Failed deleting the link between user and song." });
        }

        const composer = await ConnectTables.getSongComposer(songID);
        if (composer.length !== 0) {
            const composerID = composer[0].composer_id;
            const composerSongs = await ConnectTables.getComposerSongs(composerID);

            const deleteComposerLink = await ConnectTables.deleteComposerLink(songID);
            if (deleteComposerLink.length === 0) {
                return res.status(500).json({ error: "Failed deleting the link between composer and song." });
            }


            if (composerSongs.length === 1) {
                const deleteComposer = await Composer.deleteComposer(composerID);
                if (deleteComposer.length === 0) {
                    return res.status(500).json({ error: "Failed deleting the composer." });
                }
            }
        }

        const arranger = await ConnectTables.getSongArranger(songID);
        if (arranger.length !== 0) {
            const arrangerID = arranger[0].arranger_id;
            const arrangerSongs = await ConnectTables.getArrangerSongs(arrangerID);

            const deleteArrangerLink = await ConnectTables.deleteArrangerLink(songID);
            if (deleteArrangerLink.length === 0) {
                return res.status(500).json({ error: "Failed deleting the link between arranger and song." });
            }

            if (arrangerSongs.length === 1) {
                const deleteArranger = await Arranger.deleteArranger(arrangerID);
                if (deleteArranger.length === 0) {
                    return res.status(500).json({ error: "Failed deleting the arranger." });
                }
            }
        }

        const deleteSong = await Song.deleteSong(songID);
        if (deleteSong.length === 0) {
            return res.status(500).json({ error: "Failed deleting the song." });
        }
        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error while deleting song." });
    }
});

router.delete("/deleteComposerLink/:songID", async (req, res) => {
    const { songID } = req.params;
    if (!songID) {
        return res.status(404).json({ error: "Missing song ID" });
    }

    try {
        const composer = await ConnectTables.getSongComposer(songID);
        const deleteLink = await ConnectTables.deleteComposerLink(songID);


        if (!deleteLink) {
            return res.status(500).json({ error: "Failed deleting the composer link" });
        }

        const composerID = composer[0].composer_id;
        const composerSongs = await ConnectTables.getComposerSongs(composerID);
        if (composerSongs.length === 0) {
            const deleteComposer = await Composer.deleteComposer(composerID);
            if (!deleteComposer) {
                return res.status(500).json({ error: "Failed deleting the composer" });
            }
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while deleting composer link" });
    }
});

router.delete("/deleteArrangerLink/:songID", async (req, res) => {
    const { songID } = req.params;
    if (!songID) {
        return res.status(404).json({ error: "Missing song ID" });
    }

    try {
        const arranger = await ConnectTables.getSongArranger(songID);
        const deleteLink = await ConnectTables.deleteArrangerLink(songID);

        if (!deleteLink) {
            return res.status(500).json({ error: "Failed deleting the arranger link" });
        }

        const arrangerID = arranger[0].arranger_id;
        const arrangerSongs = await ConnectTables.getArrangerSongs(arrangerID);
        if (arrangerSongs.length === 0) {
            const deleteArranger = await Arranger.deleteArranger(arrangerID);
            if (!deleteArranger) {
                return res.status(500).json({ error: "Failed deleting the arranger" });
            }
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while deleting arranger link" })
    }
});

router.post("/linkComposer", async(req, res) => {
    const { songID, composerID } = req.body;
    if (!songID || !composerID) {
        return res.status(404).json({ error: "Missing data for linking composer to song" });
    }

    try {
        const composerLink = await ConnectTables.connectComposer(songID, composerID);
        if (!composerLink) {
            return res.status(500).json({ error: "Failed linking the composer to song" });
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while linking composer to song" });
    }
});

router.post("/linkArranger", async(req, res) => {
    const { songID, arrangerID } = req.body;
    if (!songID || !arrangerID) {
        return res.status(404).json({ error: "Missing data for linking arranger to song" });
    }

    try {
        const arrangerLink = await ConnectTables.connectArranger(songID, arrangerID);
        if (!arrangerLink) {
            return res.status(500).json({ error: "Failed linking the arranger to song" });
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while linking arranger to song" });
    }
});

export default router;