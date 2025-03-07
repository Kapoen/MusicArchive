import express from "express";
import Arranger from "../models/arranger.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { arrangerF, arrangerL } = req.body;

    try {
        const newArranger = await Arranger.addArranger(arrangerF, arrangerL);
        if (!newArranger) {
            return res.status(500).json({ error: "Failed creating arranger" });
        }

        return res.status(200).json(newArranger);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred creating arranger" });
    }
});

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