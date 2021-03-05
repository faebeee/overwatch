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
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = exports.addSuccess = exports.addSkip = exports.addFail = exports.clearReporters = exports.addReporter = void 0;
var logger = __importStar(require("./logger"));
var reporters = [];
var addReporter = function (reporter) {
    reporters.push(reporter);
    logger.info("Add reporter " + reporter.name);
};
exports.addReporter = addReporter;
var clearReporters = function () {
    reporters = [];
    logger.info("Remove all reporters");
};
exports.clearReporters = clearReporters;
var addFail = function (testCase, project, errorMessage) { return Promise.all(reporters.map(function (reporter) { return reporter.addFail ? reporter.addFail(testCase, project, errorMessage) : Promise.resolve(); })); };
exports.addFail = addFail;
var addSkip = function (testCase, project, errorMessage) { return Promise.all(reporters.map(function (reporter) { return reporter.addSkip ? reporter.addSkip(testCase, project, errorMessage) : Promise.resolve(); })); };
exports.addSkip = addSkip;
var addSuccess = function (testCase, project) { return Promise.all(reporters.map(function (reporter) { return reporter.addSuccess ? reporter.addSuccess(testCase, project) : Promise.resolve(); })); };
exports.addSuccess = addSuccess;
var report = function (projects, testCases, durationMs) { return Promise.all(reporters.map(function (reporter) { return reporter.report ? reporter.report(projects, testCases, durationMs) : Promise.resolve(); })); };
exports.report = report;
