import { ref } from "vue";

export const useBoolean = (initValue: boolean = false) => {
  const value = ref(initValue);

  const on = () => {
    value.value = true;
  };
  const off = () => {
    value.value = false;
  };
  const toggle = () => {
    value.value = !value.value;
  };

  return [value, { toggle, on, off }] as const;
};
