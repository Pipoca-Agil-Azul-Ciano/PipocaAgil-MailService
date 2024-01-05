"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SendStatusEnum_1 = require("../../Enums/SendStatusEnum");
const Mailer_1 = require("../../Providers/Mailer");
const MailRepository_1 = require("../../Repository/MailRepository");
exports.default = {
    key: 'SendMail',
    options: {
        priority: 1,
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 2000
        }
    },
    async handle(mailModel) {
        const { data } = mailModel;
        const mail = data;
        const mailer = new Mailer_1.Mailer();
        const message = {
            to: {
                email: mail.userEmail,
                name: mail.userName
            },
            subject: mail.subject,
            body: mail.body
        };
        try {
            await mailer.sendMail(message);
            mail.sendStatus = SendStatusEnum_1.SendStatusEnum.SUCCESS;
        }
        catch (err) {
            mail.sendStatus = SendStatusEnum_1.SendStatusEnum.FAILED;
        }
        finally {
            const repository = new MailRepository_1.MailRepository();
            repository.createMail(mail);
        }
    }
};
