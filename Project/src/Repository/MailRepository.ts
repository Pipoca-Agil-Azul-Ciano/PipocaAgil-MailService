import { Mail } from "../Entity/Mail";
import { IMailRepository } from "./IMailRepository";
import { pool } from "../Database/DatabaseConfig";

export class MailRepository implements IMailRepository {


    async createMail(mail: Mail): Promise<void> {

        const client = await pool.connect();

        try {
           await client.query('INSERT INTO mail (username, useremail, sendstatus, mailtype, subject, body) VALUES ($1, $2, $3, $4, $5, $6)', [mail.userName, mail.userEmail, mail.sendStatus, mail.mailType, mail.subject, mail.body]);
        } catch (err) {
            throw new Error('Database Error (error code: MR 15L)')
        } finally {
            client.release()
        }
    }

    async getMails(): Promise<Mail[]> {

        const client = await pool.connect()
        
        try {
            return (await client.query('SELECT * FROM mail')).rows
        } catch (err) {
            throw new Error('Database Error (error code: MR 27L)')
        } finally {
            client.release()
        }
    }
}