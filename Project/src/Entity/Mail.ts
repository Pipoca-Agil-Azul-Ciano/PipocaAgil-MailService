import { MailTypeEnum } from "../Enums/MailTypeEnum";
import { SendStatusEnum } from "../Enums/SendStatusEnum";

export class Mail {
    userName: string;
    userEmail: string;
    sendStatus: SendStatusEnum;
    mailType: MailTypeEnum;
    subject: string;
    body: string;

    constructor(name: string, mail: string, mailType: MailTypeEnum, bodyParam: string) {
        this.userName = name;
        this.userEmail = mail;
        this.sendStatus = SendStatusEnum.WAITING;
        this.mailType = mailType;

        this.bodyConstruction(mailType, bodyParam)
        this.subjectConstruction(mailType);
    }

    private bodyConstruction(mailType: MailTypeEnum, bodyParam: string) {
        switch (mailType) {
            case MailTypeEnum.RECOVERYPASSWORD:
                this.body =`Olá ${this.userName}!
                <a href="${bodyParam}">Clique Aqui para trocar sua senha</a>`
                break;

            case MailTypeEnum.WELCOME:
                this.body = `Olá ${this.userName}!

    Seja muito bem-vindo ao Pipoca Ágil! Estamos empolgados em tê-lo conosco. Com nossa plataforma ágil, você terá acesso a ferramentas poderosas para impulsionar sua jornada na metodologia ágil.

    Explore nossos recursos, participe de discussões e aproveite ao máximo sua experiência conosco. Estamos aqui para apoiar sua busca por eficiência, inovação e excelência.

    Em caso de dúvidas ou sugestões, não hesite em nos contatar. Estamos ansiosos para ver os excelentes resultados que você alcançará conosco!

    Cumprimentos,
    Pipoca Ágil Team`
    break;
        }
    }

    private subjectConstruction(mailType: MailTypeEnum) {
        switch (mailType) {
            case MailTypeEnum.RECOVERYPASSWORD:
                this.subject = "Pipoca Ágil - Recuperação de Senha"
                break;

            case MailTypeEnum.WELCOME:
                this.subject = "Dê as Boas-Vindas à Agilidade: Sua conta está ativada!"
                break;
        }
    }
}