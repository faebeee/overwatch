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
exports.verbose = exports.info = exports.error = exports.debug = void 0;
var log = __importStar(require("fancylog"));
var LEVELS;
(function (LEVELS) {
    LEVELS[LEVELS["ERROR"] = 0] = "ERROR";
    LEVELS[LEVELS["WARNING"] = 1] = "WARNING";
    LEVELS[LEVELS["INFO"] = 2] = "INFO";
    LEVELS[LEVELS["VERBOSE"] = 3] = "VERBOSE";
    LEVELS[LEVELS["DEBUG"] = 4] = "DEBUG";
})(LEVELS || (LEVELS = {}));
var LEVEL = process.env.LOG_LEVEL && parseInt(process.env.LOG_LEVEL) || LEVELS.WARNING;
var debug = function (str) { return LEVELS.DEBUG <= LEVEL && log.debug(str); };
exports.debug = debug;
var error = function (str) { return LEVELS.ERROR <= LEVEL && log.error(str); };
exports.error = error;
var info = function (str) { return LEVELS.INFO <= LEVEL && log.info(str); };
exports.info = info;
var verbose = function (str) { return LEVELS.VERBOSE <= LEVEL && log.verbose(str); };
exports.verbose = verbose;
process.env.NODE_ENV !== 'test' && exports.info("Use loglevel " + LEVELS[LEVEL]);
