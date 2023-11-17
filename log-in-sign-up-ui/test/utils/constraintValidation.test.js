import { describe, expect, test } from "@jest/globals";

import {
  checkEmailValidity,
  checkConfirmPasswordValidity,
  checkPasswordValidity,
} from ".../src/utils/constraintValidation";

//use toEqual for object comparisons, and toBe for value comparisons

//***********CheckEmailValidity*************/

describe("email constraint validation for valid emails", () => {
  test("supplying 'email@example.com' to the function should yield all valid constraints", () => {
    const validEmail = "email@example.com";

    expect(() => checkEmailValidity(validEmail)).toEqual({
      isValidEmail: true,
      isEmpty: true,
    });
  });
});

describe("email constraint validation for invalid character containing email", () => {
  test("supplying various invalid emails to the function should yield an invalid constraint on email validity", () => {
    const templateEmail = "email@example.com",
      invalidCharacterStrings = [];

    for (let ICS of invalidCharacterStrings) {
      const invalidEmail = ICS + templateEmail;

      expect(() => checkEmailValidity(invalidEmail)).toEqual({
        isValidEmail: false,
        isEmpty: false,
      });
    }
  });
});

//*********CheckPasswordValidity***********/

//******CheckConfirmPasswordValidity*******/
