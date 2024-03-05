import { ref, onUnmounted } from "vue";
import _ from "lodash";

export const useFuncDebounce = function () {
  const timerRef = ref<NodeJS.Timeout | undefined>(undefined);
  /**
   *
   * @param callback 被防抖的函数
   * @param delay 函数延迟执行时间
   * @param change 选择是否改变this指向
   * @returns Function
   */
  function debouncedCallback<
    T extends Function,
    K extends unknown,
    U extends unknown[]
  >(callback: T, delay: number = 500, change: boolean = true) {
    return function (object?: K, ...args: U) {
      if (timerRef.value) clearTimeout(timerRef.value);
      timerRef.value = setTimeout(function () {
        if (change && _.isObject(object)) {
          callback.apply(object, [object, ...args]);
        } else {
          callback(object, ...args);
        }
      }, delay);
    };
  }

  onUnmounted(() => {
    clearTimeout(timerRef.value);
  });

  return debouncedCallback;
};
