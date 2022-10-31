import * as pg from 'pg'
import dotenv from "dotenv"

dotenv.config()
const { Pool } = pg.default
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL // Heroku will supply us with a string called DATABASE_URL for the connectionString,
    : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export default class db{
    static async query (text, params) 
    {
        return pool.query(text, params)
    }
}