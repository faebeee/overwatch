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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var webhook_1 = require("@slack/webhook");
var logger = __importStar(require("../logger"));
var results = [];
var getFailed = function () { return results.filter(function (r) { return !r.success; }); };
var getSuccess = function () { return results.filter(function (r) { return r.success; }); };
var getTotalFailed = function () { return getFailed().length; };
var hasFailed = function () { return getTotalFailed() > 0; };
var createReportBlocks = function () {
    var blocks = [];
    var failedScenarios = getFailed();
    for (var i = 0; i < failedScenarios.length; i++) {
        var _a = failedScenarios[i], scenario = _a.scenario, config = _a.config, message = _a.message;
        blocks.push({
            type: 'context',
            elements: [
                {
                    type: 'plain_text',
                    text: ":x: *" + scenario.name + "* on " + config.url + "\n" + message,
                    emoji: true,
                },
            ],
        });
        blocks.push({
            type: 'divider',
        });
    }
    return blocks;
};
/**
 * Creates a slack reporter. This will create a list of failed/succeeded test cases and send
 * them to a webhook
 *
 * @param slackWebhookUrl
 */
exports.default = (function (slackWebhookUrl) { return ({
    name: 'Slack Reporter',
    addFail: function (scenario, config, message) {
        results.push({ scenario: scenario, config: config, success: false, message: message });
        return Promise.resolve();
    },
    addSuccess: function (scenario, config) {
        results.push({ scenario: scenario, config: config, success: true, message: null });
        return Promise.resolve();
    },
    report: function (instances, scenarios, durationMs) {
        return __awaiter(this, void 0, void 0, function () {
            var webhook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webhook = new webhook_1.IncomingWebhook(slackWebhookUrl);
                        logger.verbose("Notify slack");
                        return [4 /*yield*/, webhook.send({
                                username: 'goTom E2E',
                                blocks: __spreadArray([
                                    {
                                        type: 'section',
                                        text: {
                                            type: 'mrkdwn',
                                            text: (hasFailed() ? ':x:' : ':rocket:') + " E2E tests completed.\n\nSummary\n:white_check_mark: " + getSuccess().length + " succeeded\n:x: " + getFailed().length + " failed",
                                        },
                                    },
                                    {
                                        type: 'divider',
                                    },
                                    {
                                        type: 'section',
                                        text: {
                                            type: 'mrkdwn',
                                            text: "Overview\n:stopwatch: Duration: ~" + Math.round(durationMs / 1000) + "s\n:runner: Scenarios: " + scenarios.length + "\n:computer: Instances: " + instances.length,
                                        },
                                    },
                                    {
                                        type: 'divider',
                                    }
                                ], createReportBlocks()),
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
}); });
