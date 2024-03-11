import { UnwrapNestedRefs } from "vue";
export declare const useInfo: <T extends object>(initValus?: T) => {
    readonly info: UnwrapNestedRefs<T>;
    readonly clear: () => void;
    readonly setSyncInfo: (res: unknown, path?: string) => void;
    readonly setInfoValues: (object: any) => void;
    readonly setInfoValue: (key: string, value: any) => void;
};
