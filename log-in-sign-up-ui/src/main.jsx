import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";

import "./index.css";

import login from "./components/login";
import signup from "./components/signup";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/log-in" component={login}></Route>
      <Route path="/sign-up" component={signup}></Route>
    </BrowserRouter>
  </React.StrictMode>
);

//server will serve the same react bundle from the log-in and sign-up
//GET endpoints, but the client bundle will either render the login page
//or the sign up page based on client sided rrouting as shown above

//the page will match the URL in the browser, and navigating between login
//and signup will be via client sided routing
