import { useState, useEffect } from "react";

function FormContainer() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [responseErrors, setResponseError] = useState({
    email: null,
    password: null,
    server: null,
  }); //email, password, server error message

  function validateInputs(inputsObj) {
    if (inputsObj.email) {
      validateEmail(inputsObj.email);
    }
    if (inputsObj.password) {
      validatePassword(inputsObj.password);
    }
  }

  function validateEmail(email) {
    const validEmailCharacters = /^\S+@\S+\.\S+$/;

    if (!validEmailCharacters.test(email)) {
      setResponseError({
        ...responseErrors,
        password: "Input Error - Invalid Email",
      });
    } else {
      setResponseError({
        ...responseErrors,
        password: null,
      });
    }
  }

  function validatePassword(password) {
    const validPasswordCharacters =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (!validPasswordCharacters.test(password) || password.length < 12) {
      setResponseError({
        ...responseErrors,
        password: "Input Error - Invalid Password",
      });
    } else {
      setResponseError({
        ...responseErrors,
        password: null,
      });
    }
  }

  function isFormValid() {
    return !responseErrors.email && !responseErrors.password;
  }

  function inputChangeHandler(event) {
    const { name, value } = event.target;

    validateInputs({ [name]: value }); //for constraint validation display on UI

    setFormData({ [name]: value });
  }

  function submitHandler(event) {}

  return (
    <div className="log-in-form-container">
      <div className="error-container">
        {Object.values(responseErrors).map((errorMessage) => {
          if (errorMessage) {
            return <p className="error-message">{errorMessage}</p>;
          } //includes error messages as they appear, can be for both constraint validation, as well as some type of server error
        })}
      </div>
      <form onSubmit={submitHandler}>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={inputChangeHandler}
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          max="20"
          onChange={inputChangeHandler}
        />
        <button type="submit" disabled={isFormValid()}>
          Log-in
        </button>
      </form>
    </div>
  );
}

function Header() {
  return (
    <header>
      <img className="logo" />
      <h1 className="title">BitVault</h1>
    </header>
  );
}
//STILL NEED TO ADD LOGO IMAGE

function Footer() {
  return <footer>© Minton Development. All rights reserved.</footer>;
}

export default function Login() {
  return (
    <div className="log-in-page">
      <div className="upper-container">
        <Header />
        <FormContainer />
      </div>
      <Footer />
    </div>
  );
}
