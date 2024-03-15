interface CountDown {
    expried: boolean;
    timeStr: string;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
/**
 * Output the hours, minutes and seconds from the target time and the assembled time information
 *
 * @param targetTime
 *
 * @returns
 * {
      timeStr,
      expried,
      days,
      hours,
      minutes,
      seconds,
    }
 */
export declare const useCountDown: (targetTime: string | number | Date) => CountDown;
export {};
