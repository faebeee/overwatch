"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCaseSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.testCaseSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    environments: joi_1.default.array().items(joi_1.default.string()).required(),
    requireAuth: joi_1.default.boolean().required(),
    headless: joi_1.default.boolean().optional(),
    exec: joi_1.default.func().maxArity(2).required(),
});
