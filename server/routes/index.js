import express from "express";

import Song from "../models/song.js";
import Composer from "../models/composer.js";
import Arranger from "../models/arranger.js";
import ConnectTables from "../models/connectTables.js";
import connectTables from "../models/connectTables.js";

const router = express.Router();

router.get("/", function (req, res, next) {
    res.json({ message: "Dit werkt?" });
})

router.post("/addSong", async (req, res) => {
    const { title, composerF, composerL, arrangerF, arrangerL, part, date } = req.body;

    try {
        const song = await Song.addSong(title, part, date);

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

            const resultSTA = await connectTables.connectArranger(song[0].id, arranger[0].id);
            if (!resultSTA) {
               return res.status(500).json({ error: "Failed linking song with arranger." });
            }
        }

        return res.status(201).json(song);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error while creating song." });
    }
})

export default router;