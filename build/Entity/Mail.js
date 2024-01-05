"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = void 0;
const MailTypeEnum_1 = require("../Enums/MailTypeEnum");
const SendStatusEnum_1 = require("../Enums/SendStatusEnum");
class Mail {
    constructor(name, mail, mailType, bodyParam) {
        this.userName = name;
        this.userEmail = mail;
        this.sendStatus = SendStatusEnum_1.SendStatusEnum.WAITING;
        this.mailType = mailType;
        this.bodyConstruction(mailType, bodyParam);
        this.subjectConstruction(mailType);
    }
    bodyConstruction(mailType, bodyParam) {
        switch (mailType) {
            case MailTypeEnum_1.MailTypeEnum.RECOVERYPASSWORD:
                this.body = `Olá ${this.userName}!
                <a href="${bodyParam}">Clique Aqui para trocar sua senha</a>`;
                break;
            case MailTypeEnum_1.MailTypeEnum.WELCOME:
                this.body = `Olá ${this.userName}!

    Seja muito bem-vindo ao Pipoca Ágil! Estamos empolgados em tê-lo conosco. Com nossa plataforma ágil, você terá acesso a ferramentas poderosas para impulsionar sua jornada na metodologia ágil.

    Explore nossos recursos, participe de discussões e aproveite ao máximo sua experiência conosco. Estamos aqui para apoiar sua busca por eficiência, inovação e excelência.

    Em caso de dúvidas ou sugestões, não hesite em nos contatar. Estamos ansiosos para ver os excelentes resultados que você alcançará conosco!

    Cumprimentos,
    Pipoca Ágil Team`;
                break;
        }
    }
    subjectConstruction(mailType) {
        switch (mailType) {
            case MailTypeEnum_1.MailTypeEnum.RECOVERYPASSWORD:
                this.subject = "Pipoca Ágil - Recuperação de Senha";
                break;
            case MailTypeEnum_1.MailTypeEnum.WELCOME:
                this.subject = "Dê as Boas-Vindas à Agilidade: Sua conta está ativada!";
                break;
        }
    }
}
exports.Mail = Mail;
