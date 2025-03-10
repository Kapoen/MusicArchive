import express from "express";
import Arranger from "../models/arranger.js";
import Composer from "../models/composer.js";

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
});

router.get("/search/:name", async (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(404).json({ error: "Missing arranger name" });
    }

    try {
        const arrangerName = name.split(" ", 2);
        const arrangerF = (arrangerName.length > 0) ? arrangerName[0] : null;
        const arrangerL = (arrangerName.length > 1) ? arrangerName[1] : null;

        const arrangerResult = await Arranger.getArrangerByName(arrangerF, arrangerL);
        const arranger = arrangerResult.length > 0 ? arrangerResult[0] : null;

        return res.status(200).json(arranger);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while searching arranger" });
    }
})

export default router;