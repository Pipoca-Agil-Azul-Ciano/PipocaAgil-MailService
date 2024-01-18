import Queue from "bull";
import * as jobs from "../Index";
import dotenv from "dotenv";
dotenv.config();
export class JobQueue {
  queues: {
    bull: any;
    name: string;
    handle: any;
    options: any;
  }[];

  constructor() {
    this.queues = Object.values(jobs).map((job) => ({
      bull: new Queue(job.key,{
        redis: {
          host:process.env.REDIS_HOST,
          port: process.env.REDIS_PORT as unknown as number          
        },
      }),
      name: job.key,
      handle: job.handle,
      options: job.options,
    }));
  }

  add(name: string, data: object) {
    const queue = this.queues.find((queue) => queue.name === name);
    return queue.bull.add(data, queue.options);
  }

  process() {
    this.queues.forEach((queue) => {
      queue.bull.process(queue.handle);
      queue.bull.on("failed", (job) => {
        console.error("Job Failed: ", queue.name, job.data);
      });
      queue.bull.on("completed", (job,) => {
        // console.info("Job Completed: ", queue.name, job.data);
      });
    });
  }

}