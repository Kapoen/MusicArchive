import db from "../database/index.js";

export default {
    getComposerByID: async (id) => {
        const result = await db.query(
            "SELECT * FROM public.composer WHERE id = $1",
            [id]
        );
        return result.rows;
    },

    addComposer: async (first_name, last_name) => {
        const composer = await db.query(
            `INSERT INTO public.composer (first_name, last_name) 
                    VALUES ($1, $2)
                    RETURNING *;`,
            [first_name, last_name]
        );
        return composer.rows;
    },

    getComposerByName: async (first_name, last_name) => {
        const composer = await db.query(
            `SELECT * FROM public.composer
                    WHERE first_name = $1 AND last_name = $2;`,
            [first_name, last_name]
        );
        return composer.rows;
    },

    deleteComposer: async (composerID) => {
        const result = await db.query(
            `DELETE FROM public.composer
                    WHERE id = $1
                    RETURNING *;`,
            [composerID]
        );
        return result.rows;
    },

    updateComposer: async (composerID, first_name, last_name) => {
        const result = await db.query(
            `UPDATE public.composer
                    SET first_name = $1, last_name = $2
                    WHERE id = $3
                    RETURNING *;`,
            [first_name, last_name, composerID]
        );
        return result.rows;
    }
}