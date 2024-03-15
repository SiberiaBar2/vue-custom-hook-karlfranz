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
export declare const useFuncDebounce: () => <T extends Function, K extends unknown, U extends unknown[]>(callback: T, delay?: number, change?: boolean) => (object?: K | undefined, ...args: U) => void;
