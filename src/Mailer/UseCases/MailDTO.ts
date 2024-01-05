import { MailTypeEnum } from "../../Enums/MailTypeEnum";

export interface MailDTO {
    userName: string;
    userEmail: string;
    mailType: MailTypeEnum;
    bodyParam: string;
}