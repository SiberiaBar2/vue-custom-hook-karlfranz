/**
 *
 * Provide a throttling function
 */
export declare const useThrottle: () => (fn: Function, delay?: number) => (config?: unknown, ...args: unknown[]) => void;
