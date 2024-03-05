"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = void 0;
var isVoid = function (value) {
    return value === undefined || value === null || value === "";
};
var cleanObject = function (obj) {
    if (!obj) {
        return {};
    }
    if (typeof obj !== "object") {
        return obj;
    }
    var result = __assign({}, obj);
    Object.keys(result).forEach(function (key) {
        if (isVoid(result[key])) {
            delete result[key];
        }
    });
    return result;
};
exports.cleanObject = cleanObject;
//# sourceMappingURL=index.js.map