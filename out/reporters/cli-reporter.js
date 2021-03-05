"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.CLIReporter = void 0;
var log_symbols_1 = __importDefault(require("log-symbols"));
var logger = __importStar(require("../logger"));
exports.CLIReporter = {
    name: 'Console Reporter',
    addFail: function (testCase, project, message) {
        logger.info(log_symbols_1.default.error + " TestCase " + testCase.name + " failed on '" + project.name + "'\n" + project.url + " :: " + message);
        return Promise.resolve();
    },
    addSuccess: function (testCase, project) {
        logger.info(log_symbols_1.default.success + " TestCase " + testCase.name + " succeeded on '" + project.name + "'");
        return Promise.resolve();
    },
    addSkip: function (testCase, project) {
        logger.info(log_symbols_1.default.warning + " TestCase " + testCase.name + " skipped on '" + project.name + "'");
        return Promise.resolve();
    },
    report: function (projects, testCases, durationMs) {
        logger.info("Test cases completed. Totals: " + projects.length + " projects, " + testCases.length + " test cases, " + Math.round(durationMs / 1000) + "s ");
        return Promise.resolve();
    },
};
exports.default = exports.CLIReporter;
