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
var useFuncDebounce = function () {
    var timerRef = (0, vue_1.ref)(undefined);
    /**
     *
     * @param callback 被防抖的函数
     * @param delay 函数延迟执行时间
     * @param change 选择是否改变this指向
     * @returns Function
     */
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