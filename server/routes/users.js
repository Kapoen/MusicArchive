/**
 * Routes can (and usually should) be split up in different files, and can be nested using .use()
 */

import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config.js";

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

router.get("/:userID", async (req, res) => {
    const { userID } = req.params;
    if (!userID) {
        return res.status(404).json({ error: "Missing user ID." });
    }

    try {
        const user = await User.getUserByID(userID);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected error occurred while getting user by ID." });
    }
});

router.put("/:userID", async (req, res) => {
   const { userID } = req.params;
   if (!userID) {
       return res.status(404).json({ error: "Missing user ID." });
   }

   const { username, email } = req.body;
   if (!username || !email) {
       return res.status(404).json({ error: "Missing username or email." });
   }

   try {
       const user = await User.getUserByID(userID);
       if (!user) {
           return res.status(404).json({ error: "User not found." });
       }

       const updatedUser = await User.updateUser(userID, username, email);
       if (!updatedUser) {
           return res.status(500).json({ error: "Failed updating userinfo." });
       }

       const token = jwt.sign({ usr: user[0].username, uid: user[0].id }, config.secret, {
           algorithm: "HS256",
           allowInsecureKeySizes: true,
           expiresIn: 86400,
       });
       return res.status(200).json({ token });
   } catch (err) {
       console.log(err);
       return res.status(500).json({ error: "Unexpected error occurred while updating userinfo." });
   }

});

export default router;
