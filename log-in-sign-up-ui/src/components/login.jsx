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
  const { loginServerResponse } = useSelector((state) => state.login.value);

  //returns the error component conditionally as per the constraint validations
  return (
    loginServerResponse !== "" && (
      <div className="server-response-container">
        <h1 className="server-response-header">Server Error:</h1>
        <p className="server-response-text">{loginServerResponse}</p>
      </div>
    )
  );
}

function EmailErrors() {
  const { empty, validEmail } = useSelector(
    (state) => state.login.value.loginEmail_CV
  );

  //returns the error component conditionally as per the constraint validations
  return (
    !validEmail &&
    !empty && (
      <div className="email-errors-container">
        <h1 className="email-errors-header">Email Error(s):</h1>
        <p className="invalid-email-message">
          "Current email input is an invalid email."
        </p>
      </div>
    )
  );
}

function PasswordErrors() {
  const { empty, tooShort, tooLong } = useSelector(
    (state) => state.login.value.loginPassword_CV
  );

  //returns the error component as well as the specific message conditionally as per the constraint validations
  return (
    (tooShort || tooLong) && (
      <div className="password-errors-container">
        {(tooShort || tooLong) && (
          <h1 className="password-errors-header">Password Error(s):</h1>
        )}
        {tooShort && !empty && (
          <p className="password-too-short-message">
            "Current email input is too short to be a valid password, please
            adhere to the password length of a minimum of 12 characters"
          </p>
        )}
        {tooLong && !empty && (
          <p className="password-too-long-message">
            "Current email input is too long to be a valid password, please
            adhere to the password length of a maximum of 20 characters"
          </p>
        )}
      </div>
    )
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
  const { loginServerResponse } = useSelector((state) => state.login.value);

  //gives the state for the login email field the most up to date
  //value of the email input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    const { value } = event.target;

    dispatch(constraintValidateLoginEmail({ email: value }));
    //checks all constraint validation dimensions for the current input value
    //applies the result to the email constraint validation values in state

    if (loginServerResponse !== "") {
      dispatch(wipeLoginServerResponse());
      //any instance of a present server response error displayed, remove it once the user tries to
      //make an input change of any kind.
    }
  }

  return (
    <div className="email-container">
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" onChange={handleOnChange} />
    </div>
  );
}

function PasswordField() {
  const dispatch = useDispatch();
  const { loginServerResponse } = useSelector((state) => state.login.value);

  //gives the state for the login password field the most up to date
  //value of the password input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    const { value } = event.target;

    dispatch(constraintValidateLoginPassword({ password: value }));
    //checks all constraint validation dimensions for the current input value
    //applies the result to the password constraint validation values in state

    if (loginServerResponse !== "") {
      dispatch(wipeLoginServerResponse());
      //any instance of a present server response error displayed, remove it once the user tries to
      //make an input change of any kind.
    }
  }

  return (
    <div className="password-container">
      <label htmlFor="password">Password</label>
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

  const dispatch = useDispatch();

  //will disable the submit button unless both of the email
  //and password fields pass constraint validation
  const isSubmitAvailable =
    !emailEmpty && validEmail && !passwordEmpty && !tooShort && !tooLong;

  async function handleFormSubmit(event) {
    //will handle sending POST requests for authentication using a separate AJAX
    //request. This is so that server reponses, which will always be errors in this case since
    //on success is a server redirect, will be saved in state
    event.preventDefault();

    const formData = new FormData(event.target);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    };

    try {
      const serverResponse = await fetch("/log-in", fetchOptions),
        parsedResponse = await serverResponse.json();

      const { error } = parsedResponse; //any json response is an error

      dispatch(serverValidateLogin({ error }));
    } catch (error) {
      console.error(error, error.stack);
    }
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
      <img className="loading-animation" alt="loading animation" />
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
        <div className="right-container">
          <LoginForm />
          <Link></Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
