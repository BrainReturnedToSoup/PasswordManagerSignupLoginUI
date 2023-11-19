import { createSlice } from "@reduxjs/toolkit";

import {
  checkPasswordValidity,
  checkConfirmPasswordValidity,
} from "../utils/constraintValidation";

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    value: {
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
      },

      signupConfirmPassword: "",
      signupConfirmPassword_CV: {
        empty: true,
        matching: false,
      },

      signupServerResponse: "",
    },
  },
  reducers: {
    constraintValidateSignupEmail: (state, action) => {
      const { value, isValidEmail } = action.payload;

      const isEmpty = value.trim() === "";

      state.value.signupEmail = value;
      state.value.signupEmail_CV = {
        ...state.value.signupEmail_CV,
        empty: isEmpty,
        validEmail: isValidEmail,
      };
    },
    constraintValidateSignupPassword: (state, action) => {
      const { value } = action.payload,
        { isValidPassword, isEmpty, isTooShort, isTooLong } =
          checkPasswordValidity(value);

      //update based on relevant input constraints.

      state.value.signupPassword = value;
      state.value.signupPassword_CV = {
        ...state.value.signupPassword_CV,
        validPassword: isValidPassword,
        empty: isEmpty,
        tooShort: isTooShort,
        tooLong: isTooLong,
      };
    },
    constraintValidateSignupConfirmPassword: (state, action) => {
      const { value } = action.payload,
        { signupPassword } = state.value;

      const { isEmpty, isMatching } = checkConfirmPasswordValidity(
        value,
        signupPassword
      );

      state.value.signupConfirmPassword = value;
      state.value.signupConfirmPassword_CV = {
        ...state.value.signupConfirmPassword_CV,
        empty: isEmpty,
        matching: isMatching,
      };
    },
    wipeSignupServerResponse: (state) => {
      state.signupServerResponse = "";
    },
    wipeSignupInputs: (state) => {
      state.value.signupEmail = "";
      state.value.signupEmail_CV = {
        empty: true,
        validEmail: false,
        existingUser: false,
      };

      state.value.signupPassword = "";
      state.value.signupPassword_CV = {
        empty: true,
        tooShort: true,
        tooLong: false,
        weak: false,
      };

      state.value.signupConfirmPassword = "";
      state.value.signupConfirmPassword_CV = {
        empty: true,
        matching: false,
      };
    },
    serverValidateSignup: (state, action) => {
      const { error } = action.payload;

      //server sends a response in json, because on
      //success then the login page redirects to home
      //which is a different react bundle

      state.value.signupServerResponse = error;
    },
  },
});

const signupSliceReducer = signupSlice.reducer;

export const {
  constraintValidateSignupEmail,
  constraintValidateSignupPassword,
  constraintValidateSignupConfirmPassword,
  wipeSignupServerResponse,
  wipeSignupInputs,
  serverValidateSignup,
} = signupSlice.actions;

export { signupSlice, signupSliceReducer };
