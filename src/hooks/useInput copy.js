import { useState, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

// const inputStateReducer = (state, action) => {
//   switch (action.type) {
//     case "INPUT":
//       return { ...state, value: action.value };
//     case "BLUR":
//       return { ...state, isTouched: true };
//     case "RESET":
//       return initialInputState;
//     default:
//       return state;
//   }
// };

const useInput = (validFunc, options = {}) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validFunc(inputValue);
  const hasError = !valueIsValid && isTouched;

  // const [inputState, dispatch] = useReducer(
  //   inputStateReducer,
  //   initialInputState
  // );

  // const valueIsValid = inputState.value;
  // const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = (e) => {
    options.beforeChange && options.beforeChange();
    // dispatch({ type: "INPUT", value: e.target.value });
    setInputValue(e.target.value);
    options.afterChange && options.afterChange();
  };

  const inputBlurHandler = () => {
    options.beforeBlur && options.beforeBlur();
    // dispatch({ type: "BLUR" });

    setIsTouched(true);
    options.afterBlur && options.afterBlur();
  };

  const reset = () => {
    // dispatch({ type: "RESET" });
    setInputValue("");
    setIsTouched(false);
  };

  return {
    value: inputValue,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
