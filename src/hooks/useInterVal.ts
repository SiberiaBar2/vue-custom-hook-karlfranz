import { onUnmounted, onUpdated, ref, watchEffect } from "vue";

type Callback = () => void;

/**
 * Combined use of react hook and timer,
 *
 * This is a hook that can control speed and pause
 *
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
