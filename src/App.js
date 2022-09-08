import React, { useEffect } from "react";
import useInput from "./hooks/useInput";

const isEmailFomatCorrect = (value = "", errSetter = () => {}) => {
  if (/^([\w\d]+)@([\w\d.]+)$/.test(value)) {
    errSetter("");
  } else {
    errSetter("Email is Invalid.");
  }
};

const isNameFormatCorrect = (value = "", errSetter = () => {}) => {
  if (/^\D*$/.test(value)) {
    console.log(/^\D*$/.test(value));
    errSetter("");
  } else {
    errSetter("Name is Invalid.");
  }
};

function App() {
  const {
    value: name,
    hasError: nameHasError,
    errorText: nameErrorText,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNameFormatCorrect, { required: true });

  const {
    value: email,
    hasError: emailHasError,
    errorText: emailErrorText,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(undefined, {
    validateOnBlur: isEmailFomatCorrect,
    required: true,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(`name: ${name}\nemail: ${email}`);
  };

  const resetHandler = () => {
    resetName();
    resetEmail();
  };

  return (
    <div className="App">
      <form className="form" onSubmit={submitHandler}>
        <div className="input-ctn">
          <label htmlFor="name" className="label">
            Name
          </label>
          <span className="error-text">{nameErrorText}</span>
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
          <span className="error-text">{emailErrorText}</span>
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
            disabled={nameHasError || emailHasError ? true : false}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
