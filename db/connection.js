import knex from 'knex'
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        port: process.env.DB_PORT,
        password: process.env.PASSWORD,
        database: process.env.DB
    } 
    //connection: process.env.DATABASE
})

module.exports = { db };