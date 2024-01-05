"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailUseCases = void 0;
const Mail_1 = require("../../Entity/Mail");
const InternalErrorException_1 = require("../../Exceptions/InternalErrorException");
class MailUseCases {
    constructor(jobQueue) {
        this.jobQueue = jobQueue;
    }
    async exec(sendDTO) {
        try {
            const mail = new Mail_1.Mail(sendDTO.userName, sendDTO.userEmail, sendDTO.mailType, sendDTO.bodyParam);
            this.jobQueue.add('SendMail', mail);
        }
        catch (_a) {
            throw new InternalErrorException_1.InternalErrorException("Erro interno. Tente novamente mais tarde!");
        }
    }
}
exports.MailUseCases = MailUseCases;
