"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailRepository = void 0;
const DatabaseConfig_1 = require("../Database/DatabaseConfig");
class MailRepository {
    async createMail(mail) {
        const client = await DatabaseConfig_1.pool.connect();
        try {
            await client.query('INSERT INTO mail (username, useremail, sendstatus, mailtype, subject, body) VALUES ($1, $2, $3, $4, $5, $6)', [mail.userName, mail.userEmail, mail.sendStatus, mail.mailType, mail.subject, mail.body]);
        }
        catch (err) {
            throw new Error('Database Error (error code: MR 15L)');
        }
        finally {
            client.release();
        }
    }
    async getMails() {
        const client = await DatabaseConfig_1.pool.connect();
        try {
            return (await client.query('SELECT * FROM mail')).rows;
        }
        catch (err) {
            throw new Error('Database Error (error code: MR 27L)');
        }
        finally {
            client.release();
        }
    }
}
exports.MailRepository = MailRepository;
