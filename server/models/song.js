import db from "../database/index.js";

export default {
    getAllSongs: async () => {
        const result = await db.query("SELECT * FROM public.song;");
        return result.rows;
    },

    getSongById: async (id) => {
        const result = await db.query(
            "SELECT * FROM public.song WHERE id = $1;",
            [id]
        );
        return result.rows;
    },

    searchSongByTitle: async (title) => {
        const result = await db.query(
            "SELECT * FROM public.song WHERE title ILIKE $1;",
            [`%${title}%`]
            );
        return result.rows;
    },

    searchComposerBySong: async (songID) => {
        const result = await db.query(
            `SELECT * FROM public.composer AS c 
            JOIN song_to_composer AS stc ON c.id = stc.composer_id
            JOIN song AS s ON stc.song_id = s.id
            WHERE s.id = $1;`,
            [songID]
        );
        return result.rows;
    },

    searchArrangerBySong: async (songID) => {
        const result = await db.query(
            `SELECT * FROM public.arranger AS a 
            JOIN song_to_arranger AS sta ON a.id = sta.arranger_id
            JOIN song AS s ON sta.song_id = s.id
            WHERE s.id = $1;`,
            [songID]
        );
        return result.rows;
    }
}