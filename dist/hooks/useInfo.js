"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInfo = void 0;
var vue_1 = require("vue");
var lodash_1 = __importDefault(require("lodash"));
var INFOLAWERS = "data.data";
var useInfo = function (initValus) {
    if (initValus === void 0) { initValus = {}; }
    var info = (0, vue_1.reactive)(initValus);
    var setSyncInfo = function (res, path) {
        if (path === void 0) { path = INFOLAWERS; }
        try {
            var data = lodash_1.default.get(res, path);
            for (var key in data) {
                info[key] = data[key];
            }
        }
        catch (error) {
            console.log("setSyncInfo error", error);
        }
    };
    var setInfoValues = function (object) {
        for (var key in object) {
            info[key] = object[key];
        }
    };
    var setInfoValue = function (key, value) {
        info[key] = value;
    };
    var clear = function () {
        for (var key in info) {
            info[key] = "";
        }
    };
    (0, vue_1.onUnmounted)(function () {
        clear();
    });
    return { info: info, clear: clear, setSyncInfo: setSyncInfo, setInfoValues: setInfoValues, setInfoValue: setInfoValue };
};
exports.useInfo = useInfo;
//# sourceMappingURL=useInfo.js.map