import express from "express";
import Composer from "../models/composer.js";

const router = express.Router();

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
})

export default router;