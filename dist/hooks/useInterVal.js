"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterVal = void 0;
var vue_1 = require("vue");
var useInterVal = function (callback, delaty) {
    var savedCallback = (0, vue_1.ref)(callback);
    var timer = (0, vue_1.ref)(undefined);
    (0, vue_1.onUpdated)(function () {
        savedCallback.value = callback;
    });
    (0, vue_1.watchEffect)(function () {
        var tick = function () {
            savedCallback.value();
        };
        if (delaty !== null) {
            timer.value = setInterval(tick, delaty);
        }
    });
    (0, vue_1.onUnmounted)(function () {
        clearInterval(timer.value);
    });
};
exports.useInterVal = useInterVal;
//# sourceMappingURL=useInterVal.js.map