import { IMailer, IMessage } from "./IMailer";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import dotenv from "dotenv";
dotenv.config();


export class Mailer implements IMailer {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT as unknown as number,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }

        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: "pipoca Ágil",
                address: "contato.azulciano@outlook.com",
            },
            subject: message.subject,
            html: message.body
        });
    }
}