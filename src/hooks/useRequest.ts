import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import _ from "lodash";

import { useBoolean, useFuncDebounce, useThrottle } from ".";
import { cleanObject } from "../utils/index";

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

interface OptionsConfig {
  loop?: number;
  debounceWait?: number;
  throttleWait?: number;
  cacheKey?: string;
  ready?: boolean;
  loadingDelay?: number;
  refreshOnWindowFocus?: boolean;
  refreshDeps?: unknown[];
  retryNum?: number;
  manual?: boolean;
  responsePath?: string;
}

interface EndConfig {
  success?: (res: any) => void;
  error?: (error: Error) => void;
}

const RESPONSRCODE = 200;
const CODEPATH = "data.code";
const FAILEDMESSAGE = "获取数据失败";

const ENDCONFIG = {
  success: (res: unknown) => {},
  error: (error: Error) => {},
};

export const useRequest = <T = any>(
  syncFunc: (config?: any) => Promise<unknown>,
  options: OptionsConfig = {},
  end: EndConfig = ENDCONFIG
) => {
  const {
    loop = 0,
    ready = true,
    retryNum = 0,
    cacheKey = "",
    manual = false,
    refreshDeps = [],
    debounceWait = 0,
    throttleWait = 0,
    loadingDelay = 0,
    responsePath = "",
    refreshOnWindowFocus = false,
  } = options;
  const throttleCallback = useThrottle();
  const debouncedCallback = useFuncDebounce();
  const [loading, { on: loadingOn, off: loadingOff }] = useBoolean();

  const data = ref<T>({} as T);
  const retryNumRef = ref<number>(0);
  const requestConfig = ref<unknown>();

  /**
   * refreshDeps
   */
  refreshDeps.forEach((ele) => {
    watch(
      () => ele,
      () => {
        console.warn("useRequest refreshDeps element is change!", ele);
        getSyncDataWrap(requestConfig.value);
      },
      {
        deep: true,
      }
    );
  });

  /**
   *
   * request func
   */
  const retry = (config?: any) => {
    if (retryNum) {
      if (retryNumRef.value < retryNum) {
        retryNumRef.value += 1;
        getSyncData(config);
      }
    }
  };

  const run = (config?: unknown) => {
    getSyncDataWrap(config);
  };

  const saveData = (res: any) => {
    if (responsePath) {
      data.value = _.get(res, responsePath, {}) || {};
    } else {
      data.value = res;
    }
  };

  const getParams = (config?: unknown) => {
    if (Object.prototype.toString.call(config) === "[object Object]") {
      return !_.isEmpty(cleanObject(config as { [key: string]: unknown }))
        ? cleanObject(config as { [key: string]: unknown })
        : undefined;
    }
    return config;
  };

  const getSyncData = (config?: unknown) => {
    console.warn("useRequest getSyncData config", config);
    try {
      loadingOn();
      if (ready) {
        if (cacheKey) {
          const locationCacheData = JSON.parse(
            localStorage.getItem(cacheKey) || "{}"
          );
          if (!_.isEmpty(locationCacheData)) {
            data.value = locationCacheData;

            saveData(locationCacheData);
            end.success && end.success(locationCacheData);
            loadingOff();
          }
        } else {
          const params = getParams(config);
          if (!_.isEmpty(config)) {
            requestConfig.value = config;
          }

          syncFunc(params)
            .then((res) => {
              if (_.get(res, CODEPATH) === RESPONSRCODE) {
                saveData(res);
                end.success && end.success(res);
                cacheKey && localStorage.setItem(cacheKey, JSON.stringify(res));
                loadingOff();
              } else {
                // ElMessage.error(FAILEDMESSAGE);
                console.error(FAILEDMESSAGE);

                loadingOff();
                Promise.reject(new Error(FAILEDMESSAGE));
              }
            })
            .catch((error) => {
              loadingOff();
              end.error && end.error(error);
              console.log("useRequest error catch!", error);

              retry(config);
            });
        }
      }
    } catch (error) {
      console.log(error);
      loadingOff();
    }
  };

  const getSyncDataWrap = (config?: unknown) => {
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
  const loadingDelatyTimer = ref<NodeJS.Timeout | undefined>(undefined);
  onMounted(() => {
    if (manual) {
      return;
    }
    if (loadingDelay) {
      loadingDelatyTimer.value = setTimeout(() => {
        getSyncDataWrap(requestConfig.value);
      }, loadingDelay);
      return;
    }
    getSyncDataWrap(requestConfig.value);
  });
  onUnmounted(() => {
    if (loadingDelatyTimer.value) {
      clearTimeout(loadingDelatyTimer.value);
    }
  });

  /**
   * loop
   */
  const timer = ref<NodeJS.Timeout | undefined>(undefined);
  const loopFunc = () => {
    console.warn("useRequest loop is start!", loop);
    timer.value = setTimeout(() => {
      loopFunc();
      getSyncDataWrap(requestConfig.value);
    }, loop);
  };
  watchEffect(() => {
    if (loop) {
      loopFunc();
    }
    if (!loop && timer.value) {
      clearTimeout(timer.value);
    }
  });
  onUnmounted(() => {
    if (timer.value) clearTimeout(timer.value);
  });

  /**
   * refreshOnWindowFocus
   */
  const windowFocusFunc = () => {
    if (document.visibilityState === "visible" && refreshOnWindowFocus) {
      debouncedCallback(run, 5000)(requestConfig.value);
    }
  };
  onMounted(() => {
    document.addEventListener("visibilitychange", windowFocusFunc);
  });
  onUnmounted(() => {
    document.removeEventListener("visibilitychange", windowFocusFunc);
  });

  return {
    data,
    loading,
    run,
  };
};
