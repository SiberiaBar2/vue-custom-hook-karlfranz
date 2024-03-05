/**
 * https://ahooks.js.org/zh-CN/hooks/use-request/index
 *
 * loop?: number 轮询间隔;
 *
 * debounceWait?: number 防抖时间 若 也设置了节流择只触发防抖;
 *
 * throttleWait?: number 节流时间;
 *
 * cacheKey?: string 缓存key;
 *
 * ready?: boolean 为false请求永远不会发出;
 *
 * loadingDelay?: number 延迟请求时间;
 *
 * refreshOnWindowFocus?: boolean 屏幕聚焦时重新请求;
 *
 * refreshDeps?: unknown[] 依赖项变化时重新请求;
 *
 * retryNum?: number 错误重试次数;
 *
 * manual?: boolean 手动触发请求;
 *
 * responsePath?: string 返回数据路径;
 *
 */
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
export declare const useRequest: <T = any>(syncFunc: (config?: any) => Promise<unknown>, options?: OptionsConfig, end?: EndConfig) => {
    data: import("vue").Ref<import("vue").UnwrapRef<T>>;
    loading: import("vue").Ref<boolean>;
    run: (config?: unknown) => void;
};
export {};
