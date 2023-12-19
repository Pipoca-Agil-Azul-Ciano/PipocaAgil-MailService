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
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }

        })
    }

    async sendMail(message: IMessage): Promise<void> {
        console.log(message)

        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from: {
                name: "pipoca Ágil",
                address: "78a705f929-7b031f+1@inbox.mailtrap.io",
            },
            subject: message.subject,
            html: message.body
        })
    }
}