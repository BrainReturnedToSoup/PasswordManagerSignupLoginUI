import { useSelector, useDispatch } from "react-redux";

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
  const { signupServerResponse } = useSelector((state) => state.signup.value);

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
        {!validEmail && (
          <p className="invalid-email-message">
            "Current email input is an invalid email."
          </p>
        )}
        {existingUser && (
          <p className="existing-user-email-message">
            "Current email input is already linked to an existing user"
          </p>
        )}
      </div>
    )
  );
}

function PasswordErrors() {
  const { empty, tooShort, tooLong, weak, validPassword } = useSelector(
    (state) => state.signup.value.signupPassword_CV
  );

  //returns the error component as well as the specific message conditionally as per the constraint validations
  //the specific message is rendered based on its respective existence
  //do not want to display a message if the field is just empty though
  //valid password just means that the characters are valid, not the entire password
  return (
    (tooShort || tooLong) && (
      <div className="password-errors-container">
        {(tooShort || tooLong) && (
          <h1 className="password-errors-header">Password Error(s):</h1>
        )}
        {!validPassword && (
          <p className="password-invalid-message">
            "Current password input features invalid characters for a password,
            please adhere to the necessary for a valid password"
          </p>
        )}
        {tooShort && !empty && (
          <p className="password-too-short-message">
            "Current password input is too short to be a valid password, please
            adhere to the password length of a minimum of 12 characters"
          </p>
        )}
        {tooLong && !empty && (
          <p className="password-too-long-message">
            "Current password input is too long to be a valid password, please
            adhere to the password length of a maximum of 20 characters"
          </p>
        )}
        {validPassword && weak && (
          <p className="password-weak-message">
            "Current password input is too weak to be a valid password, plaese
            adhere to the necessary constraints for a strong password"
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

//***************Signup-Fields***************/

function EmailField() {
  const dispatch = useDispatch();
  const { signupServerResponse } = useSelector((state) => state.signup.value);

  //gives the state for the signup email field the most up to date
  //value of the email input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    dispatch(constraintValidateSignupEmail({ inputElement: event.target }));
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
  const { signupServerResponse } = useSelector((state) => state.signup.value);

  //gives the state for the signup password field the most up to date
  //value of the password input, and the corresponding
  //constraint validation flag values per input value
  function handleOnChange(event) {
    dispatch(constraintValidateSignupPassword({ inputElement: event.target }));
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
  const { signupServerResponse } = useSelector((state) => {
    state.signup.value;
  });

  const { validPassword, empty, weak } = useSelector(
    (state) => state.signup.signupPassword_CV
  );
  //for determining if the input field is enabled or not, because
  //you can't confirm a password unless you made a valid password in the first place

  const dispatch = useDispatch();

  function handleOnChange(event) {
    dispatch(
      constraintValidateSignupConfirmPassword({ inputElement: event.target })
    );
    //includes validating if the confirm password field value matches the password field value
    //This is reflected via the 'matching' CV flag

    if (signupServerResponse !== "") {
      dispatch(wipeSignupServerResponse());
      //any instance of a present server response error displayed, remove it once the user tries to
      //make an input change of any kind.
    }
  }

  return (
    <div className="confirm-password-container">
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        max="20"
        onChange={handleOnChange}
        disabled={validPassword && !empty && !weak}
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
    confirmPasswordEmpty &&
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
      <button type="submit" disabled={isSubmitAvailable}>
        Sign up
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

export default function signup() {
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
