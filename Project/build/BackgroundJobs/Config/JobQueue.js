"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const jobs = __importStar(require("../Index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JobQueue {
    constructor() {
        this.queues = Object.values(jobs).map((job) => ({
            bull: new bull_1.default(job.key, {
                redis: {
                    host: process.env.REDIS_HOST,
                    port: process.env.REDIS_PORT,
                    username: process.env.REDIS_USER,
                    password: process.env.REDIS_PASS,
                    maxRetriesPerRequest: 3
                },
            }),
            name: job.key,
            handle: job.handle,
            options: job.options,
        }));
    }
    add(name, data) {
        const queue = this.queues.find((queue) => queue.name === name);
        return queue.bull.add(data, queue.options);
    }
    process() {
        this.queues.forEach((queue) => {
            queue.bull.process(queue.handle);
            queue.bull.on("failed", (job) => {
                console.error("Job Failed: ", queue.name, job.data);
            });
            queue.bull.on("completed", (job) => {
                // console.info("Job Completed: ", queue.name, job.data);
            });
        });
    }
}
exports.JobQueue = JobQueue;
