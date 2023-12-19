import { Mail } from "../../Entity/Mail";
import { MailTypeEnum } from "../../Enums/MailTypeEnum";
import { SendStatusEnum } from "../../Enums/SendStatusEnum";
import { IMessage } from "../../Providers/IMailer";
import { Mailer } from "../../Providers/Mailer";
import { MailRepository } from "../../Repository/MailRepository";

interface IMailModel {
    data: {
        userName: string;
        userEmail: string;
        sendStatus: SendStatusEnum;
        mailType: MailTypeEnum;
        subject: string;
        body: string;
    }
}

export default {
    key: 'SendMail',
    options: {
        priority: 1,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000
        }
    },
    async handle(mailModel: IMailModel) {
        const { data } = mailModel;
        const mail = data as Mail;

        const mailer = new Mailer()

        const message: IMessage = {
            to: {
                email: mail.userEmail,
                name: mail.userName
            },
            subject: mail.subject,
            body: mail.body
        }
        try {
            await mailer.sendMail(message)
            mail.sendStatus = SendStatusEnum.SUCCESS
        } catch (err) {
            mail.sendStatus = SendStatusEnum.FAILED
        } finally {
            const repository = new MailRepository();
            repository.createMail(mail)
        }
    }
}