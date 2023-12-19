import { IMailUseCases, MailUseCases } from "./UseCases/MailUseCases";
import { MailController } from "./UseCases/MailController";
import { JobQueue } from "../BackgroundJobs/Config/JobQueue";


const jobQueue = new JobQueue();
const sendUseCases = new MailUseCases(jobQueue);
export const sendController = new MailController(sendUseCases);