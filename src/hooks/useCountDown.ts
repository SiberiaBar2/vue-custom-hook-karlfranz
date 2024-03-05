import dayjs from "dayjs";
import { useInfo } from "./useInfo";
import { useInterVal } from "./useInterVal";

/*
 * 补位
 *
 * param n 数值
 *
 * 时间补位方法
 *
 */

const bw = (n: number) => {
  return n > 9 ? n : "0" + n;
};

interface CountDown {
  expried: boolean;
  timeStr: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountDown = (targetTime: string | number | Date) => {
  const { info: timeDiff, setInfoValues: setTimeDiff } = useInfo<CountDown>({
    expried: false,
    timeStr: "",
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const time = () => {
    // 未来时间
    const future = +new Date(targetTime);
    // 现在时间
    const nowDate = +new Date();

    const s = parseInt((future - nowDate) / 1000 + ""); //转化为秒

    // * 天
    const d = parseInt(s / 86400 + "");

    // # 小时
    const h = parseInt((s % 86400) / 3600 + "");

    // todo 分钟
    const ms = parseInt((s % 3600) / 60 + "");

    // ? 秒
    const sc = parseInt((s % 60) + "");

    const expried = s > 0 ? false : true;
    const days = d < 0 ? -d : d;
    const hours = h < 0 ? -h : h;
    const minutes = ms < 0 ? -ms : ms;
    const seconds = sc < 0 ? -sc : sc;

    const isMoreText = expried ? "过去" : "还剩";

    let target = "";
    if (Object.prototype.toString.call(targetTime) === "[object Date]") {
      target = dayjs(targetTime).format("YYYY-MM-DD HH:mm:ss");
    } else {
      target = targetTime as string;
    }
    const timeStr = `距离${target}${isMoreText}:${bw(d)}天-${bw(h)}小时-${bw(
      ms
    )}分钟-${bw(sc)}秒`;

    setTimeDiff({
      timeStr,
      expried,
      days,
      hours,
      minutes,
      seconds,
    });
  };

  useInterVal(() => {
    time();
  }, 1000);

  return timeDiff as CountDown;
};
