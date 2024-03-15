"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrottle = void 0;
var vue_1 = require("vue");
/**
 *
 * Provide a throttling function
 */
var useThrottle = function () {
    var valid = (0, vue_1.ref)(false);
    var timer = (0, vue_1.ref)(undefined);
    var throttleCallback = function (fn, delay) {
        if (delay === void 0) { delay = 500; }
        return function (config) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (valid.value)
                return;
            valid.value = true;
            timer.value = setTimeout(function () {
                valid.value = false;
                fn.apply(config, __spreadArray([config], args, true));
            }, delay);
        };
    };
    (0, vue_1.onUnmounted)(function () {
        clearTimeout(timer.value);
    });
    return throttleCallback;
};
exports.useThrottle = useThrottle;
//# sourceMappingURL=useThrottle.js.map