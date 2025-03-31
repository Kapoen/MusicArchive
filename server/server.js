import 'dotenv/config'; // Auto-loads .env into process.env

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

import indexRouter from "./routes/index.js";
import songRouter from "./routes/songs.js";
import composerRouter from "./routes/composers.js";
import arrangerRouter from "./routes/arrangers.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";

const corsOptions = {
    // If you change the port number of the frontend, you need to change it here as well.
    origin: "https://kapoen.github.io/MusicArchive/",
};

// CORS provides a mechanism for securing cross-origin requests
// (i.e. requests from one domain to another, which is needed for our frontend to communicate with our backend).
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// Routes
app.use("/", indexRouter);
app.use("/song", songRouter);
app.use("/composer", composerRouter);
app.use("/arranger", arrangerRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

export default app;
