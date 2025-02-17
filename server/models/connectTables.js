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
    }
}