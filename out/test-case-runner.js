"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestCaseRunner = void 0;
var reporter_1 = require("./reporter");
var project_schema_1 = require("./schemas/project-schema");
var test_case_schema_1 = require("./schemas/test-case-schema");
var should_testcase_be_skipped_1 = require("./utils/should-testcase-be-skipped");
var chromium = require('playwright').chromium;
var ERROR_CODES = [400, 403, 404, 500, 502, 503];
var TIMEOUT = 10000;
var validateConfig = function (config, schema) {
    var _a = schema.validate(config), value = _a.value, error = _a.error;
    if (error) {
        throw new Error(error.message);
    }
    return value;
};
var execTestCase = function (testCase, project, page) { return __awaiter(void 0, void 0, void 0, function () {
    var timeout;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!project.pre) return [3 /*break*/, 2];
                return [4 /*yield*/, project.pre(page)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!(testCase.requireAuth && project.loginScript)) return [3 /*break*/, 4];
                return [4 /*yield*/, project.loginScript(page)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                timeout = setTimeout(function () {
                    throw new Error(testCase.name + " timed out on " + project.name);
                }, TIMEOUT);
                return [4 /*yield*/, testCase.exec(project, page)];
            case 5:
                _a.sent();
                clearTimeout(timeout);
                return [2 /*return*/];
        }
    });
}); };
var createTestCaseRunner = function (testCase, project) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                validateConfig(testCase, test_case_schema_1.testCaseSchema);
                validateConfig(project, project_schema_1.projectSchema);
                if (should_testcase_be_skipped_1.shouldTestcaseBeSkipped(testCase, project)) {
                    return [2 /*return*/, reporter_1.addSkip(testCase, project)];
                }
                if (testCase.requireAuth && !project.loginScript) {
                    return [2 /*return*/, reporter_1.addFail(testCase, project, "Login implementation required")];
                }
                return [4 /*yield*/, chromium.launch({ headless: (_a = testCase.headless) !== null && _a !== void 0 ? _a : true })];
            case 1:
                browser = _b.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 6, , 8]);
                // Only fetch the first response which SHOULD be the document itself (hopefully)
                page.once('response', function (response) {
                    if (ERROR_CODES.includes(response.status)) {
                        throw new Error(response.statusText);
                    }
                });
                return [4 /*yield*/, execTestCase(testCase, project, page)];
            case 4:
                _b.sent();
                return [4 /*yield*/, browser.close()];
            case 5:
                _b.sent();
                return [2 /*return*/, reporter_1.addSuccess(testCase, project)];
            case 6:
                error_1 = _b.sent();
                return [4 /*yield*/, browser.close()];
            case 7:
                _b.sent();
                return [2 /*return*/, reporter_1.addFail(testCase, project, error_1.message)];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createTestCaseRunner = createTestCaseRunner;
