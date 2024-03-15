type Callback = () => void;
/**
 * Combined use of react hook and timer,
 *
 * This is a hook that can control speed and pause
 *
 */
export declare const useInterVal: (callback: Callback, delaty: number | null) => void;
export {};
