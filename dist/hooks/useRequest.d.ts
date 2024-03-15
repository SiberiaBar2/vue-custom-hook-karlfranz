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
export declare const useRequest: <T = any>(syncFunc: (config?: any) => Promise<unknown>, options?: OptionsConfig, end?: EndConfig) => {
    data: import("vue").Ref<import("vue").UnwrapRef<T>>;
    loading: import("vue").Ref<boolean>;
    run: (config?: unknown) => void;
};
export {};
