interface CountDown {
    expried: boolean;
    timeStr: string;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export declare const useCountDown: (targetTime: string | number | Date) => CountDown;
export {};
