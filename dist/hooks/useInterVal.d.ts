type Callback = () => void;
/**
 * Combined use of composition api and timer,
 *
 * This is a hook that can control speed and pause
 *
 * param delaty can be a variable
 */
export declare const useInterVal: (callback: Callback, delaty: number | null) => void;
export {};
