"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JobQueue_1 = require("./BackgroundJobs/Config/JobQueue");
const jobQueue = new JobQueue_1.JobQueue();
jobQueue.process();
console.log('Running Queue');
