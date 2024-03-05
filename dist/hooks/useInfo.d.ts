export declare const useInfo: <T extends Record<string, any>>(initValus?: T) => {
    readonly info: Record<string, any>;
    readonly clear: () => void;
    readonly setSyncInfo: (res: unknown, path?: string) => void;
    readonly setInfoValues: (object: any) => void;
    readonly setInfoValue: (key: string, value: any) => void;
};
