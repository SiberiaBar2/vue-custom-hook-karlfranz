import { ref, onUnmounted } from "vue";
import _ from "lodash";

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
export const useFuncDebounce = function () {
  const timerRef = ref<NodeJS.Timeout | undefined>(undefined);

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
