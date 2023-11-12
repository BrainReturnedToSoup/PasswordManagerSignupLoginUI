import {
  checkEmailValidity,
  checkPasswordValidity,
} from "../utils/constraintValidation";

//expects current email payload
function constraintValidateLoginEmail(state, action) {
  const { email } = action.payload,
    validityBools = checkEmailValidity(email);

  //update based on relevant input constraints.
  return updateLoginEmailValidity(state, validityBools);
}

function updateLoginEmailValidity(state, validityBools) {
  const { empty: emptyBool, validEmail: validEmailBool } = validityBools;

  return {
    ...state,
    loginEmail_CV: {
      ...state.loginEmail_CV,
      empty: emptyBool,
      validEmail: validEmailBool,
    },
  };
}

//expects current password payload
function constraintValidateLoginPassword(state, action) {
  const { password } = action.payload,
    validityBools = checkPasswordValidity(password);

  return updateLoginPasswordValidity(state, validityBools);
}

function updateLoginPasswordValidity(state, validityBools) {
  const {
    empty: emptyBool,
    tooShort: tooShortBool,
    tooLong: tooLongBool,
    weak: weakBool,
  } = validityBools;

  return {
    ...state,
    loginPassword_CV: {
      ...state.loginPassword_CV,
      empty: emptyBool,
      tooShort: tooShortBool,
      tooLong: tooLongBool,
      weak: weakBool,
    },
  };
}

//will simply wipe the login inputs in state
function wipeLoginInputs(state) {
  return {
    ...state,
    loginEmail: "",
    loginEmail_CV: {
      empty: true,
      validEmail: false,
      doesNotExist: false,
    },
    loginPassword: "",
    loginPasswordCV: {
      empty: true,
      tooShort: true,
      tooLong: false,
      weak: false,
    },
  };
}

//expects server response payload
function serverValidateLogin(state, action) {
  const { response } = action.payload;
}

export {
  constraintValidateLoginEmail,
  constraintValidateLoginPassword,
  wipeLoginInputs,
  serverValidateLogin,
};
