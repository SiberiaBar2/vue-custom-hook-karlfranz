"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCountDown = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var useInfo_1 = require("./useInfo");
var useInterVal_1 = require("./useInterVal");
/*
 * 补位
 *
 * param n 数值
 *
 * 时间补位方法
 *
 */
var bw = function (n) {
    return n > 9 ? n : "0" + n;
};
/**
 * Output the hours, minutes and seconds from the target time and the assembled time information
 *
 * @param targetTime
 *
 * @returns
 * {
      timeStr,
      expried,
      days,
      hours,
      minutes,
      seconds,
    }
 */
var useCountDown = function (targetTime) {
    var _a = (0, useInfo_1.useInfo)({
        expried: false,
        timeStr: "",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }), timeDiff = _a.info, setTimeDiff = _a.setInfoValues;
    var time = function () {
        // 未来时间
        var future = +new Date(targetTime);
        // 现在时间
        var nowDate = +new Date();
        var s = parseInt((future - nowDate) / 1000 + ""); //转化为秒
        // * 天
        var d = parseInt(s / 86400 + "");
        // # 小时
        var h = parseInt((s % 86400) / 3600 + "");
        // todo 分钟
        var ms = parseInt((s % 3600) / 60 + "");
        // ? 秒
        var sc = parseInt((s % 60) + "");
        var expried = s > 0 ? false : true;
        var days = d < 0 ? -d : d;
        var hours = h < 0 ? -h : h;
        var minutes = ms < 0 ? -ms : ms;
        var seconds = sc < 0 ? -sc : sc;
        var isMoreText = expried ? "过去" : "还剩";
        var target = "";
        if (Object.prototype.toString.call(targetTime) === "[object Date]") {
            target = (0, dayjs_1.default)(targetTime).format("YYYY-MM-DD HH:mm:ss");
        }
        else {
            target = targetTime;
        }
        var timeStr = "\u8DDD\u79BB".concat(target).concat(isMoreText, ":").concat(bw(d), "\u5929-").concat(bw(h), "\u5C0F\u65F6-").concat(bw(ms), "\u5206\u949F-").concat(bw(sc), "\u79D2");
        setTimeDiff({
            timeStr: timeStr,
            expried: expried,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        });
    };
    (0, useInterVal_1.useInterVal)(function () {
        time();
    }, 1000);
    return timeDiff;
};
exports.useCountDown = useCountDown;
//# sourceMappingURL=useCountDown.js.map