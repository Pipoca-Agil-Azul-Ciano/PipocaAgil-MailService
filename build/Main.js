"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = require("./Routes");
const SyncTables_1 = require("./Helper/SyncTables/SyncTables");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.server = (0, express_1.default)();
const port = process.env.PORT || 3000;
exports.server.listen(port, () => {
    console.log(`Server Running at port ${port}.`);
});
exports.server.use(express_1.default.json());
exports.server.use((0, cors_1.default)());
exports.server.use(Routes_1.routes);
(0, SyncTables_1.syncTables)();
