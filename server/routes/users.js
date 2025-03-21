/**
 * Routes can (and usually should) be split up in different files, and can be nested using .use()
 */

import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
    const { username, password, email } = req.body;

    const user = await User.getUserByUsername(username);

    if (user.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.addUser(username, hashedPassword, email);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unable to create user" });
    }
});


export default router;
