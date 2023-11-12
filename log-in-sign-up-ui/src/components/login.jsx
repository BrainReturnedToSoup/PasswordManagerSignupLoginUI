import { useState } from "react";

function FormErrors() {
  return <div className="error-container"></div>;
}

function EmailField() {
  return (
    <div class="email-container">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" />
    </div>
  );
}

function PasswordField() {
  return (
    <div className="password-container">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" max="20" />
    </div>
  );
}

function LoginForm() {
  function handleFormSubmit(event) {
    //will use the current form data, and validate such with the server
    //not for constraint validation, as the onChange handlers for the inputs
    //will handle constraint validation.
  }

  //****************JSX*****************/

  return (
    <form onSubmit={handleFormSubmit}>
      <FormErrors />
      <EmailField />
      <PasswordField />
      <button type="submit">Log-in</button>
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
