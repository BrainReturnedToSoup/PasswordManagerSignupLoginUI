function checkPasswordValidity(password) {
  const isEmpty = password.trim() === "";

  const isTooLong = password.length > 20,
    isTooShort = password.length < 12 && !isEmpty;

  const validPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    isValidPassword =
      validPasswordRegex.test(password) && !isTooLong && !isTooShort;

  const isWeak = !isValidPassword && !isEmpty && !isTooLong && !isTooShort;

  return { isValidPassword, isEmpty, isTooLong, isTooShort, isWeak };
}

function checkConfirmPasswordValidity(confirm, password) {
  const isEmpty = confirm.trim() === "";

  const isMatching = confirm === password;

  return { isEmpty, isMatching };
}

export { checkPasswordValidity, checkConfirmPasswordValidity };
