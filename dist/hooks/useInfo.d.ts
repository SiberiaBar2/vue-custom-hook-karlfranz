import { UnwrapNestedRefs } from "vue";
/**
 * Get and store object data
 *
 * @clear clear function
 *
 * @setSyncInfo stores the asynchronous data obtained
 *
 * @setInfoValues stores data with multiple key value pairs
 *
 * @setInfoValue stores data for a single key value pair
 *
*/
export declare const useInfo: <T extends object>(initValus?: T) => {
    readonly info: UnwrapNestedRefs<T>;
    readonly clear: () => void;
    readonly setSyncInfo: (res: unknown, path?: string) => void;
    readonly setInfoValues: (object: any) => void;
    readonly setInfoValue: (key: string, value: any) => void;
};
