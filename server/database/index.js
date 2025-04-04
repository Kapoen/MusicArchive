import pkg from "pg";
const { Pool } = pkg;
import 'dotenv/config';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default {
    query: (text, param) => pool.query(text, param),
};