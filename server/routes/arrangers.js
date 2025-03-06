import express from "express";
import Arranger from "../models/arranger.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { arrangerF, arrangerL } = req.body;

    if (!id) {
        return res.status(404).json({ error: "Missing arranger ID" });
    }

    try {
        const updated = await Arranger.updateArranger(id, arrangerF, arrangerL);
        if (!updated) {
            return res.status(500).json({ error: "Failed updating arranger" })
        }

        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred when arranger composer" })
    }
})

export default router;