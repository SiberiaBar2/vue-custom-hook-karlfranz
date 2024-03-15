import { UnwrapNestedRefs, onUnmounted, reactive } from "vue";
import _ from "lodash";

const INFOLAWERS = "data.data";

type Key<T> = keyof UnwrapNestedRefs<T>;

/** 
 * Get and store object data
*/
export const useInfo = <T extends object>(initValus = {} as T) => {
  const info = reactive(initValus);

  const setSyncInfo = (res: unknown, path = INFOLAWERS) => {
    try {
      const data = _.get(res, path);
      for (const key in data) {
        info[key as Key<T>] = data[key];
      }
    } catch (error) {
      console.log("setSyncInfo error", error);
    }
  };
  const setInfoValues = (object: any) => {
    for (const key in object) {
      info[key as Key<T>] = object[key];
    }
  };
  const setInfoValue = (key: string, value: any) => {
    info[key as Key<T>] = value;
  };

  const clear = () => {
    for (const key in info) {
      info[key] = undefined as any;
    }
  };

  onUnmounted(() => {
    clear();
  });

  return { info, clear, setSyncInfo, setInfoValues, setInfoValue } as const;
};
