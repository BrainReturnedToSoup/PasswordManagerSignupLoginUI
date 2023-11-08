import { useState } from "react";

function FormContainer() {
  //****************State*****************/

  const [responseErrors, setResponseError] = useState({
    email: null,
    password: null,
    server: null,
  });

  //*************Helper-Funcs**************/

  function validateEmailandPassword(email, password) {
    const validEmailCharacters = /^\S+@\S+\.\S+$/,
      validPasswordCharacters =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    const updatedReponseErrors = { ...responseErrors };

    if (!validEmailCharacters.test(email)) {
      updatedReponseErrors.email = "Input Error - Invalid Email";
    } else {
      updatedReponseErrors.email = null;
    }

    if (!validPasswordCharacters.test(password) || password.length < 12) {
      updatedReponseErrors.password = "Input Error - Invalid Password";
    } else {
      updatedReponseErrors.password = null;
    }

    setResponseError(updatedReponseErrors);
  }

  //simple boolean to determine whether the login button
  //should be accessible or not to the user

  function submitHandler(event) {}

  //****************JSX*****************/

  return (
    <div className="log-in-form-container">
      <div className="error-container">
        {Object.values(responseErrors).map((errorMessage) => {
          if (errorMessage) {
            return <p className="error-message">{errorMessage}</p>;
          }
          //renders error messages if they exist,
          //can be for both constraint validation, as well as some type of server error
        })}
      </div>
      <form onSubmit={submitHandler}>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" />
        <div className="password-constainer">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" max="20" />
        </div>
        <button type="submit">Log-in</button>
      </form>
    </div>
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
      <div className="upper-container">
        <Header />
        <FormContainer />
      </div>
      <Footer />
    </div>
  );
}
