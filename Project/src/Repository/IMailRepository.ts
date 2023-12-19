import { Mail } from "../Entity/Mail";

export interface IMailRepository {
    createMail(mail: Mail): Promise<void>;
    getMails():Promise<Mail[]>
}