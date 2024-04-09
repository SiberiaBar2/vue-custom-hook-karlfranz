import { ref } from "vue";

/**
 * Boolean value state maintained by @value ref
 *
 * @on function that sets the status to true
 *
 * @off function that sets the status to false
 *
 * @toggle function to invert the state
 */
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

  return { value, toggle, on, off } as const;
};
