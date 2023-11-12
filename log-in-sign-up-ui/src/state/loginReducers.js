import {
  checkEmailValidity,
  checkPasswordValidity,
} from "../utils/constraintValidation";

//****************Email*****************/

//expects current email payload
function constraintValidateLoginEmail(state, action) {
  const { email } = action.payload,
    validityBools = checkEmailValidity(email);

  //update based on relevant input constraints.
  return updateLoginEmailValidity(state, validityBools);
}

function updateLoginEmailValidity(state, validityBools) {
  const { isValidEmail, isEmpty } = validityBools;

  return {
    ...state,
    loginEmail_CV: {
      ...state.loginEmail_CV,
      empty: isEmpty,
      validEmail: isValidEmail,
    },
  };
}

//**************Password*****************/

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

//*************Input-Wipe****************/

function wipeLoginServerResponse(state) {
  return updateServerResponse(state, "");
}
//for wiping the response on next input change

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
    loginServerResponse: "",
  };
}

//***********Server-Response**************/

//expects server response payload from the react component
//that includes handles submission logic
function serverValidateLogin(state, action) {
  const { response } = action.payload;

  const serverResponses = {
    "jwt-failure": loginJWTError,
    "contraint-validation-failure": serverSidedConstraintFailure,
    "user-authentication-failure": loginAuthError,
    "invalid-credentials": loginInvalidCredentials,
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

function loginJWTError(state) {
  return updateServerResponse(state, "jwt-service-error");
}

function serverSidedConstraintFailure(state) {
  return updateServerResponse(state, "contraint-validation-failure");
}

function loginAuthError(state) {
  return updateServerResponse(state, "authentication-error");
}

function loginInvalidCredentials(state) {
  return updateServerResponse(state, "invalid-credentials");
}

function updateServerResponse(state, response) {
  return {
    ...state,
    loginServerResponse: response,
  };
}

export {
  constraintValidateLoginEmail,
  constraintValidateLoginPassword,
  wipeLoginServerResponse,
  wipeLoginInputs,
  serverValidateLogin,
};
