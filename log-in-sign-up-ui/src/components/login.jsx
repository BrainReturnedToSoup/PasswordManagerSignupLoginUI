import { useSelector, useDispatch } from "react-redux";

import {
  constraintValidateLoginEmail,
  constraintValidateLoginPassword,
  wipeLoginServerResponse,
  wipeLoginInputs,
  serverValidateLogin,
} from "../state/loginSlice";

//************Login-Errors-Display************/

function ServerErrors() {
  const serverResponse = useSelector(
    (state) => state.login.value.loginServerResponse
  ); //state on current value that represents a server response

  //will only render messages in the event that a server response is an actual
  //message rather than an empty string
  return (
    <div className="server-response-container">
      {serverResponse !== "" ? (
        <>
          <h1 className="server-response-header">Server Response:</h1>
          <p className="server-response-text">{serverResponse}</p>
        </>
      ) : null}
    </div>
  );
}

function EmailErrors() {
  const { empty, validEmail } = useSelector(
    (state) => state.login.value.loginEmail_CV
  );
  //a bunch of constraint validation flags from redux state
  //representing the current state of the login email field

  //will only render messages in the event that an input is not empty
  //but also not a valid email based on email syntax
  return (
    <div className="login-email-errors-container">
      {!validEmail && !empty ? (
        <>
          <h1 className="login-email-errors-header">Email Error(s):</h1>
          <p className="login-invalid-email-message">
            "Current email input is an invalid email, please use the correct
            email syntax."
          </p>
        </>
      ) : null}
    </div>
  );
}

function PasswordErrors() {
  const { empty, tooShort, tooLong } = useSelector(
    (state) => state.login.value.loginPassword_CV
  );
  //a bunch of constraint validation flags from redux state
  //representing the current state of the login password field

  //will only render messages when a password is not empty as well as violating
  //either the tooShort or tooLong constraint
  return (
    <div className="login-password-errors-container">
      {tooShort || tooLong ? (
        <h1 className="login-password-errors-header">Password Error(s)</h1>
      ) : null}
      {tooShort && !empty ? (
        <p className="login-password-too-short-message">
          "Current email input is too short to be a valid password, please
          adhere to the password length of a minimum of 12 characters"
        </p>
      ) : null}
      {tooLong && !empty ? (
        <p className="login-password-too-long-message">
          "Current email input is too long to be a valid password, please adhere
          to the password length of a maximum of 20 characters"
        </p>
      ) : null}
    </div>
  );
}

function FormErrors() {
  return (
    <div className="error-container">
      <ServerErrors />
      <EmailErrors />
      <PasswordErrors />
    </div>
  );
}

//***************Login-Fields***************/

function EmailField() {
  const dispatch = useDispatch();

  //gives the state for the login email field the most up to date
  //value of the email input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    const { value } = event.target;

    dispatch(constraintValidateLoginEmail({ email: value }));
    //checks all constraint validation dimensions for the current input value
    //applies the result to the email constraint validation values in state
  }

  return (
    <div className="email-container">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" onChange={handleOnChange} />
    </div>
  );
}

function PasswordField() {
  const dispatch = useDispatch();

  //gives the state for the login password field the most up to date
  //value of the password input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    const { value } = event.target;

    dispatch(constraintValidateLoginPassword({ password: value }));
    //checks all constraint validation dimensions for the current input value
    //applies the result to the password constraint validation values in state
  }

  return (
    <div className="password-container">
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        max="20"
        onChange={handleOnChange}
      />
    </div>
  );
}

//***************Main-Page***************/

function LoginForm() {
  const { empty: emailEmpty, validEmail } = useSelector(
    (state) => state.login.value.loginEmail_CV
  );

  const {
    empty: passwordEmpty,
    tooShort,
    tooLong,
  } = useSelector((state) => state.login.value.loginPassword_CV);

  //will disable the submit button unless both of the email
  //and password fields pass constraint validation
  const isSubmitAvailable =
    !emailEmpty && validEmail && !passwordEmpty && !tooShort && !tooLong;

  const dispatch = useDispatch();

  function handleFormSubmit(event) {
    //will use the current form data, and validate such with the server
    //not for constraint validation, as the onChange handlers for the inputs
    //will handle constraint validation.
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormErrors />
      <EmailField />
      <PasswordField />
      <button type="submit" disabled={isSubmitAvailable}>
        Log-in
      </button>
    </form>
  );
}

function Header() {
  return (
    <header>
      <img className="logo" />
      <h1 className="title">BitVault</h1>
      <img className="loading-animation" />
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
      <div className="top-container">
        <div className="left-container">
          <Header />
        </div>
        <div className="log-in-form-container">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
