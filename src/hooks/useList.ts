import { reactive, ref } from "vue";
import _ from "lodash";

const ZERO = 0;

const DATALAYERS = "data.data.records";
const TOTALLAYERS = "data.data.total";
const MESSAGE = "返回为空!";

interface SetListParamsType<T> {
  res: unknown;
  customFunc?: (list: T[]) => T[];
  responsePath?: string;
  totalPath?: string;
}

// interface SetTotalParamsType {
//   res: unknown;
//   path?: string;
// }

export const useList = <T extends any>() => {
  const defaultList: T[] = [];

  const data = reactive<T[]>(defaultList);
  const setData = (list: any[]) => {
    data.length = 0;
    data.push(...list);
  };

  const total = ref<number>(ZERO);
  const setTotal = (tol: number) => {
    total.value = tol;
  };

  const setList = ({
    res,
    customFunc,
    responsePath = DATALAYERS,
    totalPath = TOTALLAYERS,
  }: SetListParamsType<T>) => {
    if (res) {
      if (customFunc && customFunc instanceof Function) {
        setData(
          customFunc(_.get(res, responsePath, defaultList)) || defaultList
        );
        setTotal(_.get(res, totalPath, ZERO) || ZERO);
      } else {
        setData(_.get(res, responsePath, defaultList) || defaultList);
        setTotal(_.get(res, totalPath, ZERO) || ZERO);
      }
    } else {
      console.log(MESSAGE);
      setData(defaultList);
      setTotal(0);
    }
  };
  // const setTotalAuxiliary = ({
  //   res,
  //   path = TOTALLAYERS,
  // }: SetTotalParamsType) => {
  //   if (res) setTotal(_.get(res, path, ZERO) || ZERO);
  //   else {
  //     console.error(MESSAGE);
  //     setTotal(ZERO);
  //   }
  // };

  return { data, total, setList } as const;
};
