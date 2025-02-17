import db from "../database/index.js";

export default {
    searchArrangerByID: async (id) => {
        const result = await db.query(
            "SELECT * FROM public.arranger WHERE id = $1",
            [id]
        );
        return result.rows;
    },

    addArranger: async (first_name, last_name) => {
        const arranger = await db.query(
            `INSERT INTO public.arranger (first_name, last_name) 
                    VALUES ($1, $2)
                    RETURNING *;`,
            [first_name, last_name]
        );
        return arranger.rows;
    }
}