import db from "../database/index.js";

export default {
    getAllSongs: async (userID) => {
        const result = await db.query(
            `SELECT s.id, s.title, s.part, s.date_added
                    FROM public.song s
                    JOIN public.user_to_song uts ON s.id = uts.song_id
                    WHERE uts.user_id = $1;`,
            [userID]
        );
        return result.rows;
    },

    getSongById: async (id) => {
        const result = await db.query(
            "SELECT * FROM public.song WHERE id = $1;",
            [id]
        );
        return result.rows;
    },

    addSong: async (title, part, date) => {
        const song = await db.query(
            `INSERT INTO public.song (title, part, date_added) 
                    VALUES ($1, $2, $3) 
                    RETURNING *;`,
            [title, part, date]
        );
        return song.rows;
    },

    deleteSong: async (songID) => {
        const result = await db.query(
            `DELETE FROM public.song
                    WHERE id = $1
                    RETURNING *;`,
            [songID]
        );
        return result.rows;
    },

    updateSong: async (songID, title, part) => {
        const result = await db.query(
            `UPDATE public.song
                    SET title = $1, part = $2
                    WHERE id = $3
                    RETURNING *;`,
            [title, part, songID]
        );
        return result.rows;
    },

    searchSong: async (keywords, userID) => {
        const searchTerms = keywords.split(" ")
            .filter((word) => word !== "" && word !== " ")
            .map((word) => {
                return `%${word}%`;
            });

        const conditions = searchTerms.map((_, index) =>
            `(s.title ILIKE $${index + 2} 
                OR s.part ILIKE $${index + 2}
                OR CONCAT(c.first_name, ' ', c.last_name) ILIKE $${index + 2}
                OR CONCAT(a.first_name, ' ', a.last_name) ILIKE $${index + 2})`
        )

        const result = await db.query(
            `SELECT s.id, s.title, s.part, s.date_added,
                c.first_name c_first_name, c.last_name c_last_name,
                a.first_name a_first_name, a.last_name a_last_name 
                FROM public.song s
                JOIN public.user_to_song uts ON s.id = uts.song_id
                FULL JOIN public.song_to_composer stc ON s.id = stc.song_id
                FULL JOIN public.composer c ON stc.composer_id = c.id
                FULL JOIN public.song_to_arranger sta ON s.id = sta.song_id
                FULL JOIN public.arranger a ON sta.arranger_id = a.id
                WHERE uts.user_id = $1 AND ${conditions.join(" AND ")};`,
                [userID, ...searchTerms]
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