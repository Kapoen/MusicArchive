import pkg from 'pg';
const { Pool } = pkg;

import config from "../config.js";

const pool = new Pool(config.db);

export default {
    query: (text, param) => pool.query(text, param),
};