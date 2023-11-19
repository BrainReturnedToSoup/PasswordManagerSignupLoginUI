import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";

import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { loginSliceReducer } from "./state/loginSlice";
import { signupSliceReducer } from "./state/signupSlice";

import { Login } from "./components/login";
import { Signup } from "./components/signup";

const store = configureStore({
  reducer: {
    login: loginSliceReducer,
    signup: signupSliceReducer,
  },
});

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/log-in" component={Login}></Route>
          <Route path="/sign-up" component={Signup}></Route>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

//server will serve the same react bundle from the log-in and sign-up
//GET endpoints, but the client bundle will either render the login page
//or the sign up page based on client sided rrouting as shown above

//the page will match the URL in the browser, and navigating between login
//and signup will be via client sided routing

export { App }; //for testing largely
