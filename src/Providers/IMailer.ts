interface IAdress {
    email: string;
    name: string;
}

export interface IMessage {
    to: IAdress;
    subject: string;
    body: string;
}

export interface IMailer {
    sendMail(message: IMessage): Promise<void>;
}