import express from "express";

const router = express.Router();

router.get("/", function (req,
                          res,
                          next) {
    res.json({ message: "Dit werkt?" });
})

export default router;