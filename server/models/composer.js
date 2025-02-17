import db from "../database/index.js";

export default {
    searchComposerByID: async (id) => {
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
    }
}