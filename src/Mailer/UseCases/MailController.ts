import { Request, Response } from "express";
import { IMailUseCases, MailUseCases } from "./MailUseCases";

export class MailController {
    constructor(
        private mailUseCase: IMailUseCases
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { userName, userEmail, mailType, bodyParam } = request.body;
            await this.mailUseCase.exec(request.body)
            return response.sendStatus(200);
        } catch (err) {
            return response.status(500).json({
                message: err.message || "Erro interno. Tente novamente mais tarde!"
            })
        }
    }

}