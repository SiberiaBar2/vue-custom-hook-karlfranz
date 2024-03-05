import { onUnmounted, ref } from "vue";

export const useThrottle = () => {
  const valid = ref<boolean>(false);
  const timer = ref<NodeJS.Timeout | undefined>(undefined);

  const throttleCallback = (fn: Function, delay: number = 500) => {
    return (config?: unknown, ...args: unknown[]) => {
      if (valid.value) return;

      valid.value = true;
      timer.value = setTimeout(() => {
        valid.value = false;
        fn.apply(config, [config, ...args]);
      }, delay);
    };
  };

  onUnmounted(() => {
    clearTimeout(timer.value);
  });

  return throttleCallback;
};
