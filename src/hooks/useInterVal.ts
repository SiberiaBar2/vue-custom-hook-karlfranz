import { onUnmounted, onUpdated, ref, watchEffect } from "vue";

type Callback = () => void;

/**
 * Combined use of composition api and timer,
 *
 * This is a hook that can control speed and pause
 *
 * param delaty can be a variable
 */
export const useInterVal = (callback: Callback, delaty: number | null) => {
  const savedCallback = ref<Callback>(callback);
  const timer = ref<NodeJS.Timeout | undefined>(undefined);

  onUpdated(() => {
    savedCallback.value = callback;
  });

  watchEffect(() => {
    const tick = () => {
      savedCallback.value();
    };

    if (delaty !== null) {
      timer.value = setInterval(tick, delaty);
    }
  });

  onUnmounted(() => {
    clearInterval(timer.value);
  });
};
