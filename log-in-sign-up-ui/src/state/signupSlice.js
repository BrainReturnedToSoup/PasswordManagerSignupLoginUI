import { createSlice } from "@reduxjs/toolkit";

import {
  checkPasswordValidity,
  checkConfirmPasswordValidity,
} from "../utils/constraintValidation";

const signupSlice = createSlice({
  name: "sign-up",
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
        weak: false,
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
      const { inputElement } = action.payload;

      const isValidEmail = inputElement.checkValidity(),
        isEmpty = inputElement.value.trim() !== "";

      state.value.signupEmail_CV = {
        ...state.value.signupEmail_CV,
        empty: isEmpty,
        validEmail: isValidEmail,
      };
    },
    constraintValidateSignupPassword: (state, action) => {
      const { inputElement } = action.payload,
        { isValidPassword, isEmpty, isTooShort, isTooLong, isWeak } =
          checkPasswordValidity(inputElement.value);

      //update based on relevant input constraints.

      state.signupPassword_CV = {
        ...state.signupPassword_CV,
        validPassword: isValidPassword,
        empty: isEmpty,
        tooShort: isTooShort,
        tooLong: isTooLong,
        weak: isWeak,
      };
    },
    constraintValidateSignupConfirmPassword: (state, action) => {
      const { inputElement } = action.payload,
        { signupPassword } = state;

      const { isEmpty, isMatching } = checkConfirmPasswordValidity(
        inputElement.value,
        signupPassword
      );

      state.signupConfirmPassword_CV = {
        ...state.signupConfirmPassword_CV,
        empty: isEmpty,
        matching: isMatching,
      };
    },
    wipeSignupServerResponse: (state) => {
      state.signupServerResponse = "";
    },
    wipeSignupInputs: (state) => {
      state.signupEmail = "";
      state.signupEmail_CV = {
        empty: true,
        validEmail: false,
        existingUser: false,
      };

      state.signupPassword = "";
      state.signupPassword_CV = {
        empty: true,
        tooShort: true,
        tooLong: false,
        weak: false,
      };

      state.signupConfirmPassword = "";
      state.signupConfirmPassword_CV = {
        empty: true,
        matching: false,
      };
    },
    serverValidateSignup: (state, action) => {
      const { response } = action.payload;

      const serverResponses = [
        "jwt-failure",
        "contraint-validation-failure",
        "user-authentication-failure",
        "db-connection",
        "existing-user",
      ];
      //server sends a response in json, because on
      //success then the login page redirects to home
      //which is a different react bundle

      if (serverResponses.includes(response)) {
        state.signupServerResponse = response;
      }
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
