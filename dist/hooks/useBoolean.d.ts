/**
 * Boolean value state maintained by @value ref
 *
 * @on function that sets the status to true
 *
 * @off function that sets the status to false
 *
 * @toggle function to invert the state
 */
export declare const useBoolean: (initValue?: boolean) => {
    readonly value: import("vue").Ref<boolean>;
    readonly toggle: () => void;
    readonly on: () => void;
    readonly off: () => void;
};
