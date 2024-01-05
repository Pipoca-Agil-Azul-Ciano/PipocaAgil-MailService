import { JobQueue } from "./BackgroundJobs/Config/JobQueue";

const jobQueue = new JobQueue();

jobQueue.process()

console.log('Running Queue')