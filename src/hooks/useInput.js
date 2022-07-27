import { useState } from "react";

const useInput = (validFunc, onInput, onBlur) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validFunc(inputValue);
  const hasError = !valueIsValid && isTouched;

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
    typeof onInput === "function" && onInput();
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
    typeof onInput === "function" && onBlur();
  };

  const reset = () => {
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
