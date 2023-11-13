import { createSlice } from "@reduxjs/toolkit";

import {
  checkEmailValidity,
  checkPasswordValidity,
} from "../utils/constraintValidation";

const loginSlice = createSlice({
  name: "log-in",
  initialState: {
    value: {
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
    },
  },
  reducers: {
    constraintValidateLoginEmail: (state, action) => {
      const { email } = action.payload,
        { isValidEmail, isEmpty } = checkEmailValidity(email);

      //update based on relevant input constraints.
      state.loginEmail_CV = {
        ...state.loginEmail_CV,
        empty: isEmpty,
        validEmail: isValidEmail,
      };
    },
    constraintValidateLoginPassword: (state, action) => {
      const { password } = action.payload,
        { isEmpty, isTooShort, isTooLong } = checkPasswordValidity(password);

      state.loginPassword_CV = {
        ...state.loginPassword_CV,
        empty: isEmpty,
        tooShort: isTooShort,
        tooLong: isTooLong,
      };
    },
    wipeLoginServerResponse: (state) => {
      state.loginServerResponse = "";
    },
    wipeLoginInputs: (state) => {
      state.loginEmail = "";
      state.loginEmail_CV = {
        empty: true,
        validEmail: false,
        doesNotExist: false,
      };

      state.loginPassword = "";
      state.loginPassword_CV = {
        empty: true,
        tooShort: true,
        tooLong: false,
        weak: false,
      };
    },
    serverValidateLogin: (state, action) => {
      const { response } = action.payload;

      const serverResponses = [
        "jwt-failure",
        "contraint-validation-failure",
        "user-authentication-failure",
        "invalid-credentials",
      ];

      //server sends a response in json, because on
      //success then the login page redirects to home
      //which is a different react bundle

      if (serverResponses.includes(response)) {
        state.loginServerResponse = response;
      }
    },
  },
});

const loginSliceReducer = loginSlice.reducer;

export const {
  constraintValidateLoginEmail,
  constraintValidateLoginPassword,
  wipeLoginServerResponse,
  wipeLoginInputs,
  serverValidateLogin,
} = loginSlice.actions;

export { loginSlice, loginSliceReducer };
