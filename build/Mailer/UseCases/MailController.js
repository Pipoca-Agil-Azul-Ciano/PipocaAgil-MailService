"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailController = void 0;
class MailController {
    constructor(mailUseCase) {
        this.mailUseCase = mailUseCase;
    }
    async handle(request, response) {
        try {
            const { userName, userEmail, mailType, bodyParam } = request.body;
            await this.mailUseCase.exec(request.body);
            return response.sendStatus(200);
        }
        catch (err) {
            return response.status(500).json({
                message: err.message || "Erro interno. Tente novamente mais tarde!"
            });
        }
    }
}
exports.MailController = MailController;
