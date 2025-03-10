import express from "express";
import Composer from "../models/composer.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { composerF, composerL } = req.body;

    try {
        const newComposer = await Composer.addComposer(composerF, composerL);
        if (!newComposer) {
            return res.status(500).json({ error: "Failed creating composer" });
        }

        return res.status(200).json(newComposer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred creating composer" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { composerF, composerL } = req.body;

    if (!id) {
        return res.status(404).json({ error: "Missing composer ID" });
    }

    try {
        const updated = await Composer.updateComposer(id, composerF, composerL);
        if (!updated) {
            return res.status(500).json({ error: "Failed updating composer" })
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred when updating composer" })
    }
});

router.get("/search/:name", async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(404).json({ error: "Missing composer name" });
    }

    try {
        const composerName = name.split(" ", 2);
        const composerF = (composerName.length > 0) ? composerName[0] : null;
        const composerL = (composerName.length > 1) ? composerName[1] : null;

        const composerResult = await Composer.getComposerByName(composerF, composerL);
        const composer = composerResult.length > 0 ? composerResult[0] : null;

        return res.status(200).json(composer);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while searching composer" });
    }
})

export default router;