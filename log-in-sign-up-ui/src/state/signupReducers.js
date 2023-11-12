import {
  checkEmailValidity,
  checkPasswordValidity,
  checkConfirmPasswordValidity,
} from "../utils/constraintValidation";

//****************Email*****************/

//expects current email payload
function constraintValidateSignupEmail(state, action) {
  const { email } = action.payload,
    validityBools = checkEmailValidity(email);

  //update based on relevant input constraints.
  return updateSignupEmailValidity(state, validityBools);
}

function updateSignupEmailValidity(state, validityBools) {
  const { isValidEmail, isEmpty } = validityBools;

  return {
    ...state,
    signupEmail_CV: {
      ...state.signupEmail_CV,
      empty: isEmpty,
      validEmail: isValidEmail,
    },
  };
}

//**************Password*****************/

//expects current password payload
function constraintValidateSignupPassword(state, action) {
  const { password } = action.payload,
    validityBools = checkPasswordValidity(password);

  //update based on relevant input constraints.
  return updateSignupPasswordValidity(state, validityBools);
}

function updateSignupPasswordValidity(state, validityBools) {
  const { isValidPassword, isEmpty, isTooShort, isTooLong, isWeak } =
    validityBools;

  return {
    ...state,
    signupPassword_CV: {
      ...state.signupPassword_CV,
      validPassword: isValidPassword,
      empty: isEmpty,
      tooShort: isTooShort,
      tooLong: isTooLong,
      weak: isWeak,
    },
  };
}

//***********Confirm-Password**************/

//expects current confirm password payload
function constraintValidateConfirmPassword(state, action) {
  const { confirmPassword } = action.payload,
    { signupPassword: password } = state,
    validityBools = checkConfirmPasswordValidity(confirmPassword, password);

  return updateSignupConfirmPasswordValidity(state, validityBools);
}

function updateSignupConfirmPasswordValidity(state, validityBools) {
  const { isEmpty, isMatching } = validityBools;

  return {
    ...state,
    signupConfirmPassword_CV: {
      ...state.signupConfirmPassword_CV,
      empty: isEmpty,
      matching: isMatching,
    },
  };
}

//**************Input-Wipe*****************/

function wipeServerResponse(state) {
  return updateServerResponse(state, "");
}
//for wiping the response on next input change

//will simply wipe the sign up inputs in state
function wipeSignupInputs(state) {
  return {
    ...state,
    signupEmail: "",
    signupEmail_CV: {
      empty: true,
      validEmail: false,
      existingUser: false,
    },
    signupPassword: "",
    signupPassword_CV: {
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
  };
}

//****************Server*****************/

//expects server response payload
function serverValidateSignup(state, action) {
  const { response } = action.payload;

  const serverResponses = {
    "jwt-failure": signupJWTError,
    "contraint-validation-failure": serverSidedConstraintFailure,
    "user-authentication-failure": signupAuthError,
    "db-connection": dbConnectionError,
    "existing-user": existingUserError,
  };
  //server sends a response in json, because on
  //success then the login page redirects to home
  //which is a different react bundle

  if (response in serverResponses) {
    return serverResponses[response](state);
  }

  return state;
}

//***Return-Altered-State***/

function signupJWTError(state) {
  return updateServerResponse(state, "jwt-service-error");
}

function serverSidedConstraintFailure(state) {
  return updateServerResponse(state, "constraint-validation-error");
}

function signupAuthError(state) {
  return updateServerResponse(state, "authentication-error");
}

function dbConnectionError(state) {
  return updateServerResponse(state, "db-connection-error");
}

function existingUserError(state) {
  return updateServerResponse(state, "existing-user");
}

function updateServerResponse(state, response) {
  return {
    ...state,
    signupServerResponse: response,
  };
}

export {
  constraintValidateSignupEmail,
  constraintValidateSignupPassword,
  constraintValidateConfirmPassword,
  wipeServerResponse,
  wipeSignupInputs,
  serverValidateSignup,
};
