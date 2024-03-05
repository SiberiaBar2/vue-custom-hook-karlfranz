"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBoolean = void 0;
var vue_1 = require("vue");
var useBoolean = function (initValue) {
    if (initValue === void 0) { initValue = false; }
    var value = (0, vue_1.ref)(initValue);
    var on = function () {
        value.value = true;
    };
    var off = function () {
        value.value = false;
    };
    var toggle = function () {
        value.value = !value.value;
    };
    return [value, { toggle: toggle, on: on, off: off }];
};
exports.useBoolean = useBoolean;
//# sourceMappingURL=useBoolean.js.map