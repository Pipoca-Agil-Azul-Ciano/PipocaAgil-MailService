"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const Index_1 = require("./Mailer/Index");
const MailRepository_1 = require("./Repository/MailRepository");
exports.routes = (0, express_1.Router)();
exports.routes
    .get('/', (req, res) => { res.status(200).send('Connection OK'); })
    .post('/mail/send', (req, res) => {
    return Index_1.sendController.handle(req, res);
})
    //teste
    .get('/mail', async (req, res) => {
    const a = new MailRepository_1.MailRepository();
    const mails = await a.getMails();
    return res.status(200).json({
        mails
    });
});
