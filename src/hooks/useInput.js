import { useState, useEffect } from "react";

const initialOptions = {
  required: true,
  beforeChange: () => {},
  afterChange: () => {},
  validateOnBlur: null,
};

const useInput = (validFunc = () => {}, options = { ...initialOptions }) => {
  const [inputValue, setInputValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [errorText, setErrorText] = useState("");
  const isEmpty = inputValue.trim() === "";
  const hasError = errorText !== "" && isTouched;

  useEffect(() => {
    if (isTouched) {
      if (!options.validateOnBlur) {
        validFunc(inputValue, setErrorText);
        isEmpty &&
          setErrorText(options.required ? "The field is required" : "");
      }
    }
  }, [inputValue, validFunc, isTouched, options, isEmpty]);

  useEffect(() => {
    console.log(errorText);
  }, [errorText]);

  const inputChangeHandler = (e) => {
    options.beforeChange && options.beforeChange();
    setInputValue(e.target.value);
    options.afterChange && options.afterChange();
  };

  const inputBlurHandler = () => {
    if (options.validateOnBlur) {
      options.validateOnBlur(inputValue, setErrorText);
      isEmpty && setErrorText(options.required ? "The field is required" : "");
    }
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setIsTouched(false);
    errorText("");
  };

  return {
    value: inputValue,
    errorText,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
