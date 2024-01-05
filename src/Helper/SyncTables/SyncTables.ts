import { pool } from "../../Database/DatabaseConfig";

export async function syncTables() {
    const client = await pool.connect()

    try {
        const query = `
        CREATE TABLE IF NOT EXISTS mail(
            id SERIAL PRIMARY KEY,
            userName VARCHAR(255) NOT NULL,
            userEmail VARCHAR(255) NOT NULL,
            sendStatus VARCHAR(255) NOT NULL,
            mailType VARCHAR(255) NOT NULL,
            subject VARCHAR(255) NOT NULL,
            body TEXT
        );`

        await client.query(query);
        console.log("Tables Synced.");
    } catch (err) {
        console.error("Table sync error: ", err);
    }finally {
        client.release();
    }
}