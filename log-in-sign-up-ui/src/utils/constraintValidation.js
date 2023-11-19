function checkPasswordValidity(password) {
  const isEmpty = password.trim() === "";
  //always check for an empty input first

  const isTooLong = password.length > 20,
    isTooShort = password.length < 12 && !isEmpty;
  //checking character length, which the too short flag does not apply
  //if the input is empty

  const validPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    isValidPassword =
      validPasswordRegex.test(password) && !isTooLong && !isTooShort;
  //validates the password if such falls within the valid length constraint

  return { isValidPassword, isEmpty, isTooLong, isTooShort };
}

function checkConfirmPasswordValidity(confirm, password) {
  const isEmpty = confirm.trim() === "";

  const isMatching = confirm === password;

  return { isEmpty, isMatching };
}

export { checkPasswordValidity, checkConfirmPasswordValidity };
