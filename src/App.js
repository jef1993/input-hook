import React, { useEffect } from "react";
import useInput from "./hooks/useInput";

const isNotEmpty = (value) => {
  return value.trim() !== "" ? true : false;
};
const isEmailFomatCorrect = (value) => {
  return value.trim() !== "" && /^([\w\d]+)@([\w\d.]+)$/.test(value)
    ? true
    : false;
};

function App() {
  const {
    value: name,
    isValid: isNameValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: email,
    isValid: isEmailValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmailFomatCorrect, { afterBlur: extraBlurHandler });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`name: ${name}\nemail: ${email}`);
  };

  const resetHandler = () => {
    resetName();
    resetEmail();
  };

  function extraBlurHandler() {
    console.log("blur");
  }

  // useEffect(() => {
  //   console.log(isEmailValid && isNameValid);
  // }, [isEmailValid, isNameValid]);

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
            type="text"
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
          ></input>
        </div>
        <div className="input-ctn">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            className={`input${emailHasError ? " error" : ""}`}
            type="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          ></input>
        </div>
        <div className="btns">
          <button className="btn" type="button" onClick={resetHandler}>
            Reset
          </button>
          <button
            className="btn"
            disabled={isEmailValid && isNameValid ? false : true}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
