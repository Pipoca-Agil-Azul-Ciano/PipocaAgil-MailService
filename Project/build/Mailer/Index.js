"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendController = void 0;
const MailUseCases_1 = require("./UseCases/MailUseCases");
const MailController_1 = require("./UseCases/MailController");
const JobQueue_1 = require("../BackgroundJobs/Config/JobQueue");
const jobQueue = new JobQueue_1.JobQueue();
const sendUseCases = new MailUseCases_1.MailUseCases(jobQueue);
exports.sendController = new MailController_1.MailController(sendUseCases);
