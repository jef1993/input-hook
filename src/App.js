import React from "react";
import useInput from "./hooks/useInput";

function App() {
  const {
    value: name,
    isValid: isNameValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput((value) => {
    return value.trim() !== "" ? true : false;
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`name: ${name}`);
  };

  const resetHandler = () => {
    resetName();
  };

  return (
    <div className="App">
      <form className="form" onSubmit={submitHandler}>
        <div className="input-ctn">
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            className={`input${nameHasError ? " error" : ""}`}
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
        </div>
        <div className="btns">
          <button className="btn" type="button" onClick={resetHandler}>
            Reset
          </button>
          <button className="btn" disabled={!isNameValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
