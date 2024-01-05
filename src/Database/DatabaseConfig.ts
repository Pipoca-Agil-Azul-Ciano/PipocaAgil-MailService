import {Pool} from "pg"
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT as unknown as number,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASS
})