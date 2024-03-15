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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFuncDebounce = void 0;
var vue_1 = require("vue");
var lodash_1 = __importDefault(require("lodash"));
/**
 *
 * Provide an anti-shake function
 *
 * @param callback function to be stabilized
 *
 * @param delay function delay execution time
 *
 * @param change Choose whether to change this pointer
 *
 * @returns Function
 */
var useFuncDebounce = function () {
    var timerRef = (0, vue_1.ref)(undefined);
    function debouncedCallback(callback, delay, change) {
        if (delay === void 0) { delay = 500; }
        if (change === void 0) { change = true; }
        return function (object) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (timerRef.value)
                clearTimeout(timerRef.value);
            timerRef.value = setTimeout(function () {
                if (change && lodash_1.default.isObject(object)) {
                    callback.apply(object, __spreadArray([object], args, true));
                }
                else {
                    callback.apply(void 0, __spreadArray([object], args, false));
                }
            }, delay);
        };
    }
    (0, vue_1.onUnmounted)(function () {
        clearTimeout(timerRef.value);
    });
    return debouncedCallback;
};
exports.useFuncDebounce = useFuncDebounce;
//# sourceMappingURL=useFuncDebounce.js.map