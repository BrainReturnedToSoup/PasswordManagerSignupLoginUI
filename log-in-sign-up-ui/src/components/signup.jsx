import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  constraintValidateSignupEmail,
  constraintValidateSignupPassword,
  constraintValidateSignupConfirmPassword,
  wipeSignupServerResponse,
  wipeSignupInputs,
  serverValidateSignup,
} from "../state/signupSlice";

//************Signup-Errors-Display************/

function ServerErrors() {
  const signupServerResponse = useSelector(
    (state) => state.signup.value.signupServerResponse
  );

  //returns the error component conditionally if a server response actually exists
  return (
    signupServerResponse !== "" && (
      <div className="server-response-container">
        <h1 className="server-response-header">Server Error:</h1>
        <p className="server-response-text">{signupServerResponse}</p>
      </div>
    )
  );
}

function EmailErrors() {
  const { empty, validEmail, existingUser } = useSelector(
    (state) => state.signup.value.signupEmail_CV
  );

  //returns the error component conditionally as per the constraint validations
  //the error container exists in any instance of a type of error
  //the specific message is rendered based on its respective existence
  //do not want to display a message if the field is just empty though
  return (
    (!validEmail || existingUser) &&
    !empty && (
      <div className="email-errors-container">
        <h1 className="email-errors-header">Email Error(s):</h1>
        {!validEmail && !empty && (
          <p className="invalid-email-message">
            Current email input is an invalid email.
          </p>
        )}
        {existingUser && !empty && (
          <p className="existing-user-email-message">
            Current email input is already linked to an existing user
          </p>
        )}
      </div>
    )
  );
}

function PasswordErrors() {
  const { empty, tooShort, tooLong, validPassword } = useSelector(
    (state) => state.signup.value.signupPassword_CV
  );

  //returns the error component as well as the specific message conditionally as per the constraint validations
  //the specific message is rendered based on its respective existence
  //do not want to display a message if the field is just empty though
  //valid password just means that the characters are valid, not the entire password
  return (
    (tooShort || tooLong || !validPassword) &&
    !empty && (
      <div className="password-errors-container">
        <h1 className="password-errors-header">Password Error(s):</h1>
        <p className="password-invalid-message">
          Current password input is invalid, please adhere to the constraints
          below.
        </p>

        {tooShort && !empty && (
          <p className="password-too-short-message">
            Too short to be a valid password, please adhere to the password
            length of a minimum of 12 characters.
          </p>
        )}
        {tooLong && !empty && (
          <p className="password-too-long-message">
            Too long to be a valid password, please adhere to the password
            length of a maximum of 20 characters.
          </p>
        )}
        {!validPassword && !empty && !tooShort && !tooLong && (
          <p className="password-too-short-message">
            Contains either invalid characters, or is too weak.
          </p>
        )}
      </div>
    )
  );
}

function ConfirmPasswordErrors() {
  const { empty, matching } = useSelector(
    (state) => state.signup.value.signupConfirmPassword_CV
  );

  return (
    !matching &&
    !empty && (
      <div className="confirm-password-errors-container">
        <h1 className="confirm-password-errors-header">
          Confirm Password Error(s):
        </h1>
        <p className="confirm-password-invalid-message">
          Confirm password input is invalid, please adhere to the constraints
          below.
        </p>

        {!matching && !empty && (
          <p className="confirm-password-not-matching-message">
            Password and Confirm Password do not match.
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
      <ConfirmPasswordErrors />
    </div>
  );
}

//***************Signup-Fields***************/

function EmailField() {
  const dispatch = useDispatch();
  const signupServerResponse = useSelector(
    (state) => state.signup.value.signupServerResponse
  );

  //gives the state for the signup email field the most up to date
  //value of the email input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    const emailValidity = event.target.checkValidity();

    dispatch(
      constraintValidateSignupEmail({
        value: event.target.value,
        isValidEmail: emailValidity,
      })
    );
    //checks all constraint validation dimensions for the current input value
    //applies the result to the email constraint validation values in state

    if (signupServerResponse !== "") {
      dispatch(wipeSignupServerResponse());
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
  const signupServerResponse = useSelector(
    (state) => state.signup.value.signupServerResponse
  );

  //gives the state for the signup password field the most up to date
  //value of the password input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    dispatch(constraintValidateSignupPassword({ value: event.target.value }));
    //checks all constraint validation dimensions for the current input value
    //applies the result to the password constraint validation values in state

    if (signupServerResponse !== "") {
      dispatch(wipeSignupServerResponse());
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

function ConfirmPasswordField() {
  const signupServerResponse = useSelector(
    (state) => state.signup.value.signupServerResponse
  );

  const { validPassword, empty, weak } = useSelector(
    (state) => state.signup.value.signupPassword_CV
  );
  //for determining if the input field is enabled or not, because
  //you can't confirm a password unless you made a valid password in the first place

  const dispatch = useDispatch();

  function handleOnChange(event) {
    dispatch(
      constraintValidateSignupConfirmPassword({ value: event.target.value })
    );
    //includes validating if the confirm password field value matches the password field value
    //This is reflected via the 'matching' CV flag

    if (signupServerResponse !== "") {
      dispatch(wipeSignupServerResponse());
      //any instance of a present server response error displayed, remove it once the user tries to
      //make an input change of any kind.
    }
  }

  const isInputFieldAvailable = validPassword && !empty && !weak;

  return (
    <div className="confirm-password-container">
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        max="20"
        onChange={handleOnChange}
        disabled={!isInputFieldAvailable}
      />
    </div>
  );
}

//***************Main-Page***************/

function SignupForm() {
  const { empty: emailEmpty, validEmail } = useSelector(
    (state) => state.signup.value.signupEmail_CV
  );

  const {
    empty: passwordEmpty,
    tooShort,
    tooLong,
    validPassword,
  } = useSelector((state) => state.signup.value.signupPassword_CV);

  const { empty: confirmPasswordEmpty, matching } = useSelector(
    (state) => state.signup.value.signupConfirmPassword_CV
  );

  const dispatch = useDispatch();

  //will disable the submit button unless the email,
  //password, and confirm password fields pass constraint validation
  const isSubmitAvailable =
    !emailEmpty &&
    validEmail &&
    !passwordEmpty &&
    !tooShort &&
    !tooLong &&
    validPassword &&
    !confirmPasswordEmpty &&
    matching;

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
      const serverResponse = await fetch("/sign-up", fetchOptions),
        parsedResponse = await serverResponse.json();

      const { error } = parsedResponse; //any json response is an error

      dispatch(serverValidateSignup({ error }));
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormErrors />
      <EmailField />
      <PasswordField />
      <ConfirmPasswordField />
      <button type="submit" disabled={!isSubmitAvailable}>
        Sign up
      </button>
    </form>
  );
}

function Header() {
  return (
    <header>
      <img className="logo" alt="logo" />
      <h1 className="title">BitVault</h1>
      <img className="loading-animation" alt="loading icon" />
    </header>
  );
}
//STILL NEED TO ADD LOGO IMAGE

function Footer() {
  return <footer>© Minton Development. All rights reserved.</footer>;
}

function Signup() {
  const dispatch = useDispatch();

  function wipeSignupState() {
    dispatch(wipeSignupInputs());
    dispatch(wipeSignupServerResponse());
    //the components will handle the element state, but the redux state needs
    //to be wiped
  }

  return (
    <div className="sign-up-page">
      <div className="top-container">
        <div className="left-container">
          <Header />
        </div>
        <div className="right-container">
          <SignupForm />
          <Link to="/log-in" onClick={wipeSignupState}>
            Existing User? Log in here!
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export {
  Signup,
  Footer,
  Header,
  SignupForm,
  ConfirmPasswordField,
  PasswordField,
  EmailField,
  FormErrors,
  ServerErrors,
  PasswordErrors,
  EmailErrors,
};
