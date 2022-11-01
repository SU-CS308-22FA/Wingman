import * as pg from 'pg'
import dotenv from "dotenv"

dotenv.config({
    path: '../.env'
})
const { Pool } = pg.default
//const isProduction = process.env.NODE_ENV === "production";
//const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default class db{
    static async query (text, params) 
    {
        return pool.query(text, params)
    }
}