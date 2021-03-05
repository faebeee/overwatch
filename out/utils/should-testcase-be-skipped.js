"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldTestcaseBeSkipped = void 0;
var shouldTestcaseBeSkipped = function (testCase, project) {
    var isTestCaseInSkipClause = project.skipTestCase.includes(testCase.name);
    var matchEnvironments = testCase.environments.length > 0 ? testCase.environments.includes(project.environment) : true;
    return !matchEnvironments || isTestCaseInSkipClause;
};
exports.shouldTestcaseBeSkipped = shouldTestcaseBeSkipped;
