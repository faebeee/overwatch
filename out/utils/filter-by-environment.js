"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnvironmentFilter = void 0;
var createEnvironmentFilter = function (environments) { return function (object) {
    if (environments.length === 0) {
        return true;
    }
    if (object.environment) {
        return environments.includes(object.environment);
    }
    return environments.some(function (env) {
        var _a, _b;
        if (((_a = object.environments) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return true;
        }
        return (_b = object.environments) === null || _b === void 0 ? void 0 : _b.includes(env);
    });
}; };
exports.createEnvironmentFilter = createEnvironmentFilter;
