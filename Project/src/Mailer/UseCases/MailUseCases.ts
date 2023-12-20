import { JobQueue } from "../../BackgroundJobs/Config/JobQueue";
import { Mail } from "../../Entity/Mail";
import { InternalErrorException } from "../../Exceptions/InternalErrorException";

import { MailDTO } from "./MailDTO";

export interface IMailUseCases {
    exec(sendDTO: MailDTO): Promise<void>
}

export class MailUseCases implements IMailUseCases {
    constructor(
        private jobQueue: JobQueue
    ) { }

    async exec(sendDTO: MailDTO): Promise<void> {
        try {
            const mail: Mail = new Mail(sendDTO.userName, sendDTO.userEmail, sendDTO.mailType, sendDTO.bodyParam);
            this.jobQueue.add('SendMail', mail)
        } catch {
            throw new InternalErrorException("Erro interno. Tente novamente mais tarde!");
        }
    }

}