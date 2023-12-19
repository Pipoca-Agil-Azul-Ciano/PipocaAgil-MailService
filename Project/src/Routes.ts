import { Router } from "express";
import { sendController } from "./Mailer/Index";
import { MailRepository } from "./Repository/MailRepository";

export const routes = Router()

routes
    .get('/', (req, res) => {res.status(200).send('Connection OK')})
    .post('/mail/send', (req, res) => {
        return sendController.handle(req, res);
    })

    
    //teste
    .get('/mail', async (req, res) => {
        const a = new MailRepository();
        const mails = await a.getMails();
        console.log(mails)
        return res.status(200).json({
            mails
        });
    })