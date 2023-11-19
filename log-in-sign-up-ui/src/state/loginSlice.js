import { createSlice } from "@reduxjs/toolkit";

import { checkPasswordValidity } from "../utils/constraintValidation";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: {
      loginEmail: "",
      loginEmail_CV: {
        empty: true,
        validEmail: false,
      },

      loginPassword: "",
      loginPassword_CV: {
        empty: true,
        tooShort: true,
        tooLong: false,
      },

      loginServerResponse: "",
    },
  },
  reducers: {
    //update based on relevant input constraints.
    constraintValidateLoginEmail: (state, action) => {
      const { inputElement } = action.payload;

      const isValidEmail = inputElement.checkValidity(), //uses built in email constraint validation
        isEmpty = inputElement.value.trim() !== "";

      state.value.loginEmail_CV = {
        ...state.value.loginEmail_CV,
        empty: isEmpty,
        validEmail: isValidEmail,
      };
    },
    //update based on relevant input constraints.
    constraintValidateLoginPassword: (state, action) => {
      const { inputElement } = action.payload,
        { isEmpty, isTooShort, isTooLong } = checkPasswordValidity(
          inputElement.value
        );

      state.value.loginPassword_CV = {
        ...state.value.loginPassword_CV,
        empty: isEmpty,
        tooShort: isTooShort,
        tooLong: isTooLong,
      };
    },
    wipeLoginServerResponse: (state) => {
      state.value.loginServerResponse = "";
    },
    wipeLoginInputs: (state) => {
      state.value.loginEmail = "";
      state.value.loginEmail_CV = {
        empty: true,
        validEmail: false,
      };

      state.value.loginPassword = "";
      state.value.loginPassword_CV = {
        empty: true,
        tooShort: true,
        tooLong: false,
      };
    },
    serverValidateLogin: (state, action) => {
      const { error } = action.payload;

      //server sends a response in json, because on
      //success then the login page redirects to home
      //which is a different react bundle

      state.value.loginServerResponse = error;
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
