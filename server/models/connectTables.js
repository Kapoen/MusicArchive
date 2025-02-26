import db from "../database/index.js";

export default {
    connectComposer: async (songID, composerID) => {
        const result = await db.query(
        `INSERT INTO public.song_to_composer (song_id, composer_id) 
                VALUES ($1, $2)
                RETURNING *;`,
            [songID, composerID]
        );
        return result.rows;
    },

    connectArranger: async (songID, arrangerID) => {
        const result = await db.query(
        `INSERT INTO public.song_to_arranger (song_id, arranger_id) 
                VALUES ($1, $2)
                RETURNING *;`,
            [songID, arrangerID]
        );
        return result.rows;
    },

    getSongComposer: async (songID) => {
        const composer = await db.query(
            `SELECT * FROM public.song_to_composer
                    WHERE song_id = $1;`,
            [songID]
        );
        return composer.rows;
    },

    getSongArranger: async (songID) => {
        const arranger = await db.query(
            `SELECT * FROM public.song_to_arranger
                    WHERE song_id = $1;`,
            [songID]
        );
        return arranger.rows;
    },

    getComposerSongs: async (composerID) => {
        const songs = await db.query(
            `SELECT * FROM public.song_to_composer
                    WHERE composer_id = $1;`,
            [composerID]
        );
        return songs.rows;
    },

    getArrangerSongs: async (arrangerID) => {
        const songs = await db.query(
            `SELECT * FROM public.song_to_arranger
                    WHERE arranger_id = $1;`,
            [arrangerID]
        );
        return songs.rows;
    },

    deleteComposerLink: async (songID, composerID) => {
        const result = await db.query(
            `DELETE FROM public.song_to_composer
                    WHERE song_id = $1 AND composer_id = $2
                    RETURNING *;`,
            [songID, composerID]
        );
        return result.rows;
    },

    deleteArrangerLink: async (songID, arrangerID) => {
        const result = await db.query(
            `DELETE FROM public.song_to_arranger
                    WHERE song_id = $1 AND arranger_id = $2
                    RETURNING *;`,
            [songID, arrangerID]
        );
        return result.rows;
    }
}