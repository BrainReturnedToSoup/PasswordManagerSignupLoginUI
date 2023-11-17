function checkPasswordValidity(password) {
  const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  isValidPassword = validPasswordRegex.test(password);

  const weakPasswordRegex = /^(?:[a-z]+|[A-Za-z]+)$/;
  isWeak = weakPasswordRegex.test(password);

  const isEmpty = password === "";

  const isTooLong = password.split("").length > 20,
    isTooShort = password.split("").length < 12;

  return { isValidPassword, isEmpty, isTooLong, isTooShort, isWeak };
}

function checkConfirmPasswordValidity(confirm, password) {
  const isEmpty = confirm === "";

  const isMatching = confirm === password;

  return { isEmpty, isMatching };
}

export {
  checkEmailValidity,
  checkPasswordValidity,
  checkConfirmPasswordValidity,
};
