import redux from "redux";

//***********Sub-Reducers*************/

import {
  constraintValidateLoginEmail,
  constraintValidateLoginPassword,
  wipeLoginServerResponse,
  wipeLoginInputs,
  serverValidateLogin,
} from "./loginReducers";

import {
  constraintValidateSignupEmail,
  constraintValidateSignupPassword,
  constraintValidateConfirmPassword,
  wipeSignupServerResponse,
  wipeSignupInputs,
  serverValidateSignup,
} from "./signupReducers";

//**********Action-Constants**********/

export const actions = Object.freeze({
  constraintValidateLoginEmail: "CV_LOGIN_EMAIL",
  constraintValidateLoginPassword: "CV_LOGIN_PASSWORD",

  wipeLoginServerResponse: "WIPE_LOGIN_SERVER_RESPONSE",
  wipeLoginInputs: "WIPE_LOGIN_INPUTS",

  serverValidateLogin: "SV_LOGIN",

  //************/

  constraintValidateSignupEmail: "CHECK_SIGN_UP_EMAIL",
  constraintValidateSignupPassword: "CHECK_SIGN_UP_PASSWORD",
  constraintValidateSignupConfirmPassword: "CHECK_SIGN_UP_CONFIRM_PASSWORD",

  wipeSignupServerResponse: "WIPE_SIGN_UP_SERVER_RESPONSE",
  wipeSignupInputs: "WIPE_SIGN_UP_INPUTS",

  serverValidateSignup: "SV_SIGN_UP",
});

//**************State****************/

const initialState = {
  loginEmail: "",
  loginEmail_CV: {
    empty: true,
    validEmail: false,
  },

  loginPassword: "",
  loginPasswordCV: {
    empty: true,
    tooShort: true,
    tooLong: false,
  },

  loginServerResponse: "",

  //************/

  signupEmail: "",
  signupEmail_CV: {
    empty: true,
    validEmail: false,
    existingUser: false,
  },

  signupPassword: "",
  signupPassword_CV: {
    validPassword: false,
    empty: true,
    tooShort: true,
    tooLong: false,
    weak: false,
  },

  signupConfirmPassword: "",
  signupConfirmPassword_CV: {
    empty: true,
    matching: false,
  },

  signupServerResponse: "",
};

//***********Root-Reducer*************/

function reducer(state = initialState, action) {
  const reducerFuncs = {
    [actions.constraintValidateLoginEmail]: constraintValidateLoginEmail,

    [actions.constraintValidateLoginPassword]: constraintValidateLoginPassword,

    [actions.wipeLoginServerResponse]: wipeLoginServerResponse,
    [actions.wipeLoginInputs]: wipeLoginInputs,

    [actions.serverValidateLogin]: serverValidateLogin,

    //************/

    [actions.constraintValidateSignupEmail]: constraintValidateSignupEmail,

    [actions.constraintValidateSignupPassword]:
      constraintValidateSignupPassword,
    [actions.constraintValidateSignupConfirmPassword]:
      constraintValidateConfirmPassword,

    [actions.wipeSignupServerResponse]: wipeSignupServerResponse,
    [actions.wipeSignupInputs]: wipeSignupInputs,

    [actions.serverValidateSignup]: serverValidateSignup,
  };

  if (action.type in reducerFuncs) {
    return reducerFuncs[action.type](state, action);
  }

  return state;
}
