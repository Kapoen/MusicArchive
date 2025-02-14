import db from "../database/index.js";

export default {
    searchComposerByID: async (id) => {
        const result = await db.query(
            "SELECT * FROM public.composer WHERE id = $1",
            [id]
        );
        return result.rows;
    }
}