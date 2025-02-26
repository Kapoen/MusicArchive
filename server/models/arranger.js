import db from "../database/index.js";

export default {
    getArrangerByID: async (id) => {
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
    },

    getArrangerByName: async (first_name, last_name) => {
        const arranger = await db.query(
            `SELECT * FROM public.arranger
                    WHERE first_name = $1 AND last_name = $2;`,
            [first_name, last_name]
        );
        return arranger.rows;
    },

    deleteArranger: async (arrangerID) => {
        const result = await db.query(
            `DELETE FROM public.arranger
                    WHERE id = $1
                    RETURNING *;`,
            [arrangerID]
        );
        return result.rows;
    }
}