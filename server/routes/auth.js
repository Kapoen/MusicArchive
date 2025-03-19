import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import config from "../config.js";

const router = express.Router();

// Login Route
router.get("/token", async (req, res) => {
    const { username, password } = req.query;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await User.getUserByUsername(username);

    // Check if user exists
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    console.log(user)

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // If we reach this point, the user has been successfully authenticated
    // So construct and send a new JSON Web Token for the user
    const token = jwt.sign({ id: user.username }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
    });
    return res.status(200).json({ token });
});

export default router;
