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
  const { empty: emptyBool, validEmail: validEmailBool } = validityBools;

  return {
    ...state,
    signupEmail_CV: {
      ...state.signupEmail_CV,
      empty: emptyBool,
      validEmail: validEmailBool,
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
  const {
    empty: emptyBool,
    tooShort: tooShortBool,
    tooLong: tooLongBool,
    weak: weakBool,
  } = validityBools;

  return {
    ...state,
    signupPassword_CV: {
      ...state.signupPassword_CV,
      empty: emptyBool,
      tooShort: tooShortBool,
      tooLong: tooLongBool,
      weak: weakBool,
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
  const { empty: emptyBool, matching: matchingBool } = validityBools;

  return {
    ...state,
    signupConfirmPassword_CV: {
      ...state.signupConfirmPassword_CV,
      empty: emptyBool,
      matching: matchingBool,
    },
  };
}

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
}

export {
  constraintValidateSignupEmail,
  constraintValidateSignupPassword,
  constraintValidateConfirmPassword,
  wipeSignupInputs,
  serverValidateSignup,
};
