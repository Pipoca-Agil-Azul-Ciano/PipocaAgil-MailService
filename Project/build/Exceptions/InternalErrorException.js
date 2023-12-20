"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorException = void 0;
class InternalErrorException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.InternalErrorException = InternalErrorException;
