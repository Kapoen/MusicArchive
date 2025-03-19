import db from "../database/index.js";

export default {
    getUserByUsername: async (username) => {
        const result = await db.query(
            `SELECT * FROM public.user WHERE username = $1;`,
            [username]
        );
        return result.rows;
    },

    addUser: async (username, password, email) => {
        const user = await db.query(
            `INSERT INTO public.user (username, password, email)
                VALUES ($1, $2, $3)
                RETURNING *;`,
            [username, password, email]
        );
        return user.rows;
    }
};
