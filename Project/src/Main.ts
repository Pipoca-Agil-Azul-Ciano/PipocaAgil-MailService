import express from "express";
import cors from "cors";
import { routes } from "./Routes";
import { syncTables } from "./Helper/SyncTables/SyncTables";
import dotenv from "dotenv";
dotenv.config();


export const server = express();
const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server Running at port ${port}.`);
});
server.use(express.json());
server.use(cors());
server.use(routes);

syncTables();