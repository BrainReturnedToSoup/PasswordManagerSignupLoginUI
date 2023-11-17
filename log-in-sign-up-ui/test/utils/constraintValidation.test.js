import { describe, expect, it } from "vitest";

import {
  checkConfirmPasswordValidity,
  checkPasswordValidity,
} from "../../src/utils/constraintValidation";

//use toEqual for object comparisons, and toBe for value comparisons

//*********CheckPasswordValidity***********/

describe("valid password constraint validation", () => {
  it("check if value passes valid password filter for necessary characters", () => {
    const validPasswords = [
      "AbcD@#defg1@", // valid password
      "AnotherPwd2!01OE", // valid password
    ];

    for (const password of validPasswords) {
      expect(checkPasswordValidity(password)).toEqual({
        isValidPassword: true,
        isEmpty: false,
        isTooLong: false,
        isTooShort: true,
        isWeak: false,
      });
    }

    const invalidPasswords = [
      "weakpassword", // missing uppercase letter, digit, and special character
      "ShortPwd1@", // too short
      "TooLongPassword1234567890!@#$%^", // too long
      "noSpecialCharacter", // missing special character
      "1234567890", // missing uppercase letter and special character
      "    ", // empty
    ];

    //anything that isn't a valid password is either empty or does not meet
    //the length constraints
    const invalidPasswordOutputs = [
      {
        isValidPassword: false,
        isEmpty: false,
        isTooLong: false,
        isTooShort: false,
        isWeak: true,
      },
      {
        isValidPassword: false,
        isEmpty: false,
        isTooLong: false,
        isTooShort: true,
        isWeak: false,
      },
      {
        isValidPassword: false,
        isEmpty: false,
        isTooLong: true,
        isTooShort: false,
        isWeak: false,
      },
      {
        isValidPassword: false,
        isEmpty: false,
        isTooLong: false,
        isTooShort: false,
        isWeak: true,
      },
      {
        isValidPassword: false,
        isEmpty: false,
        isTooLong: false,
        isTooShort: false,
        isWeak: true,
      },
      {
        isValidPassword: false,
        isEmpty: true,
        isTooLong: false,
        isTooShort: false,
        isWeak: false,
      },
    ];

    for (let i = 0; i < invalidPasswords.length; i++) {
      expect(checkPasswordValidity(invalidPasswords[i])).toEqual(
        invalidPasswordOutputs[i]
      );
    }
  });
});

//******CheckConfirmPasswordValidity*******/

describe("confirm password constraint validation", () => {
  it(`essentially just making sure that if the function is supplied 
    two strings that it returns a boolea non whether the strings match. 
     Also checking if the input is empty or not`, () => {
    const stringSet = [
      "asdfoiwelDs@4L#!S",
      "dsiewlgio&1@E",
      "@8475#0OdesL@",
      "#&$@lsdOSLEgW",
      "abcdefghijklmnop",
      "12345678901",
      "123982991413",
      "sfo",
    ];

    //check if function will return a true match
    for (let string of stringSet) {
      expect(checkConfirmPasswordValidity(string, string)).toEqual({
        isEmpty: false,
        isMatching: true,
      });
    }

    const nonMatchingPairs = [
      [0, 1],
      [1, 3],
      [7, 2],
      [3, 6],
      [5, 4],
      [4, 1],
    ];

    //testing possible non matching strings to make sure that the isMatching from before isn't a fluke
    for (let indexPair of nonMatchingPairs) {
      expect(checkConfirmPasswordValidity(indexPair[0], indexPair[1])).toEqual({
        isEmpty: false,
        isMatching: false,
      });
    }

    const emptyStringCases = [
      ["", "      "],
      ["", "nonEmptyString"],
      ["    ", ""],
    ];

    //also testing if the function handles empty strings correctly
    for (let stringPair of emptyStringCases) {
      expect(
        checkConfirmPasswordValidity(stringPair[0], stringPair[1])
      ).toEqual({
        isEmpty: true,
        isMatching: false,
      });
    }
  });
});
