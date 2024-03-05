import { onUnmounted, reactive } from "vue";
import _ from "lodash";

const INFOLAWERS = "data.data";

export const useInfo = <T extends Record<string, any>>(initValus = {} as T) => {
  const info = reactive(initValus) as Record<string, any>;

  const setSyncInfo = (res: unknown, path = INFOLAWERS) => {
    try {
      const data = _.get(res, path);
      for (const key in data) {
        info[key] = data[key];
      }
    } catch (error) {
      console.log("setSyncInfo error", error);
    }
  };
  const setInfoValues = (object: any) => {
    for (const key in object) {
      info[key] = object[key];
    }
  };
  const setInfoValue = (key: string, value: any) => {
    info[key] = value;
  };

  const clear = () => {
    for (const key in info) {
      info[key] = "";
    }
  };

  onUnmounted(() => {
    clear();
  });

  return { info, clear, setSyncInfo, setInfoValues, setInfoValue } as const;
};
