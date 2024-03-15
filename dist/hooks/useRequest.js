"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequest = void 0;
var vue_1 = require("vue");
var lodash_1 = __importDefault(require("lodash"));
var _1 = require(".");
var index_1 = require("../utils/index");
var RESPONSRCODE = 200;
var CODEPATH = "data.code";
var FAILEDMESSAGE = "获取数据失败";
var ENDCONFIG = {
    success: function (res) { },
    error: function (error) { },
};
/**
 * Data request hook, similar to ahooks useRequest
 *
 * https://ahooks.js.org/zh-CN/hooks/use-request/index
 *
 * loop?: polling interval;
 *
 * debounceWait?: debounce time. If throttling is also set, only trigger debounce;
 *
 * throttleWait?: throttling time;
 *
 * cacheKey?: string cache key;
 *
 * ready?: boolean is false and the request will never be issued;
 *
 * loadingDelay?: delay request time;
 *
 * refreshOnWindowFocus?: boolean Request when the screen is focused;
 *
 * refreshDeps?: unknown[] Request when dependencies change;
 *
 * retryNum?: number Number of error retries;
 *
 * manual?: boolean manually triggers the request;
 *
 * responsePath?: string returns data path;
 *
 */
var useRequest = function (syncFunc, options, end) {
    if (options === void 0) { options = {}; }
    if (end === void 0) { end = ENDCONFIG; }
    var _a = options.loop, loop = _a === void 0 ? 0 : _a, _b = options.ready, ready = _b === void 0 ? true : _b, _c = options.retryNum, retryNum = _c === void 0 ? 0 : _c, _d = options.cacheKey, cacheKey = _d === void 0 ? "" : _d, _e = options.manual, manual = _e === void 0 ? false : _e, _f = options.refreshDeps, refreshDeps = _f === void 0 ? [] : _f, _g = options.debounceWait, debounceWait = _g === void 0 ? 0 : _g, _h = options.throttleWait, throttleWait = _h === void 0 ? 0 : _h, _j = options.loadingDelay, loadingDelay = _j === void 0 ? 0 : _j, _k = options.responsePath, responsePath = _k === void 0 ? "" : _k, _l = options.refreshOnWindowFocus, refreshOnWindowFocus = _l === void 0 ? false : _l;
    var throttleCallback = (0, _1.useThrottle)();
    var debouncedCallback = (0, _1.useFuncDebounce)();
    var _m = (0, _1.useBoolean)(), loading = _m[0], _o = _m[1], loadingOn = _o.on, loadingOff = _o.off;
    var data = (0, vue_1.ref)({});
    var retryNumRef = (0, vue_1.ref)(0);
    var requestConfig = (0, vue_1.ref)();
    /**
     * refreshDeps
     */
    refreshDeps.forEach(function (ele) {
        (0, vue_1.watch)(function () { return ele; }, function () {
            console.warn("useRequest refreshDeps element is change!", ele);
            getSyncDataWrap(requestConfig.value);
        }, {
            deep: true,
        });
    });
    /**
     *
     * request func
     */
    var retry = function (config) {
        if (retryNum) {
            if (retryNumRef.value < retryNum) {
                retryNumRef.value += 1;
                getSyncData(config);
            }
        }
    };
    var run = function (config) {
        getSyncDataWrap(config);
    };
    var saveData = function (res) {
        if (responsePath) {
            data.value = lodash_1.default.get(res, responsePath, {}) || {};
        }
        else {
            data.value = res;
        }
    };
    var getParams = function (config) {
        if (Object.prototype.toString.call(config) === "[object Object]") {
            return !lodash_1.default.isEmpty((0, index_1.cleanObject)(config))
                ? (0, index_1.cleanObject)(config)
                : undefined;
        }
        return config;
    };
    var getSyncData = function (config) {
        console.warn("useRequest getSyncData config", config);
        try {
            loadingOn();
            if (ready) {
                if (cacheKey) {
                    var locationCacheData = JSON.parse(localStorage.getItem(cacheKey) || "{}");
                    if (!lodash_1.default.isEmpty(locationCacheData)) {
                        data.value = locationCacheData;
                        saveData(locationCacheData);
                        end.success && end.success(locationCacheData);
                        loadingOff();
                    }
                }
                else {
                    var params = getParams(config);
                    if (!lodash_1.default.isEmpty(config)) {
                        requestConfig.value = config;
                    }
                    syncFunc(params)
                        .then(function (res) {
                        if (lodash_1.default.get(res, CODEPATH) === RESPONSRCODE) {
                            saveData(res);
                            end.success && end.success(res);
                            cacheKey && localStorage.setItem(cacheKey, JSON.stringify(res));
                            loadingOff();
                        }
                        else {
                            // ElMessage.error(FAILEDMESSAGE);
                            console.error(FAILEDMESSAGE);
                            loadingOff();
                            Promise.reject(new Error(FAILEDMESSAGE));
                        }
                    })
                        .catch(function (error) {
                        loadingOff();
                        end.error && end.error(error);
                        console.log("useRequest error catch!", error);
                        retry(config);
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            loadingOff();
        }
    };
    var getSyncDataWrap = function (config) {
        if (debounceWait) {
            return debouncedCallback(getSyncData, debounceWait)(config);
        }
        if (throttleWait) {
            return throttleCallback(getSyncData, throttleWait)(config);
        }
        return getSyncData(config);
    };
    /**
     * is loadingDelay
     */
    var loadingDelatyTimer = (0, vue_1.ref)(undefined);
    (0, vue_1.onMounted)(function () {
        if (manual) {
            return;
        }
        if (loadingDelay) {
            loadingDelatyTimer.value = setTimeout(function () {
                getSyncDataWrap(requestConfig.value);
            }, loadingDelay);
            return;
        }
        getSyncDataWrap(requestConfig.value);
    });
    (0, vue_1.onUnmounted)(function () {
        if (loadingDelatyTimer.value) {
            clearTimeout(loadingDelatyTimer.value);
        }
    });
    /**
     * loop
     */
    var timer = (0, vue_1.ref)(undefined);
    var loopFunc = function () {
        console.warn("useRequest loop is start!", loop);
        timer.value = setTimeout(function () {
            loopFunc();
            getSyncDataWrap(requestConfig.value);
        }, loop);
    };
    (0, vue_1.watchEffect)(function () {
        if (loop) {
            loopFunc();
        }
        if (!loop && timer.value) {
            clearTimeout(timer.value);
        }
    });
    (0, vue_1.onUnmounted)(function () {
        if (timer.value)
            clearTimeout(timer.value);
    });
    /**
     * refreshOnWindowFocus
     */
    var windowFocusFunc = function () {
        if (document.visibilityState === "visible" && refreshOnWindowFocus) {
            debouncedCallback(run, 5000)(requestConfig.value);
        }
    };
    (0, vue_1.onMounted)(function () {
        document.addEventListener("visibilitychange", windowFocusFunc);
    });
    (0, vue_1.onUnmounted)(function () {
        document.removeEventListener("visibilitychange", windowFocusFunc);
    });
    return {
        data: data,
        loading: loading,
        run: run,
    };
};
exports.useRequest = useRequest;
//# sourceMappingURL=useRequest.js.map