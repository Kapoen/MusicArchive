import db from "../database/index.js";

export default {
    getAllSongs: async () => {
        const result = await db.query("SELECT * FROM public.song");
        return result.rows;
    },

    searchSongByTitle: async (title) => {
        const result = await db.query(
            "SELECT * FROM public.song WHERE title ILIKE $1",
            [`%${title}%`]
            );
        return result.rows;
    },

    searchSongByComposer: async (composer) => {
        const result = await db.query(
            "SELECT * FROM public.song WHERE composer ILIKE $1",
            [`%${composer}%`]
        );
        return result.rows;
    }
}