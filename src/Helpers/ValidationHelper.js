import {
  alphabateRegex,
  alphabetsRegexWithoutSpace,
  alphaNumericCharRegex,
  alphaNumericRegex,
  alphaNumericRegexWithoutSpace,
  emailRegex,
  numericRegex,
  phoneNumberRegex,
} from "./RegexHelper";

export const onlyAlphabets = (value) => {
  return alphabetsRegexWithoutSpace.test(value);
};

export const AlphaNumericSpecialCharValidator = (value) => {
  if (value.length && !value.trim()) {
    return false;
  } else if (!value || alphaNumericCharRegex.test(value)) {
    return true;
  }
  return false;
};

export const AlphaNumericValidator = (value) => {
  // const alphaNumericRegex = /^[a-zA-Z0-9 ]+$/;

  // starting key/letter spacebar then return false;
  if (value.length && !value.trim()) {
    return false;
  } else if (!value || alphaNumericRegex.test(value)) {
    return true;
  }
  return false;
};

export const AlphaNumericValidatorWithOutSpace = (value) => {
  // const alphaNumericRegex = /^[a-zA-Z0-9]+$/;

  // starting key/letter spacebar then return false;
  if (value?.length && !value.trim()) {
    return false;
  } else if (!value || alphaNumericRegexWithoutSpace.test(value)) {
    return true;
  }
  return false;
};

export const AlphaValidator = (value) => {
  if (value.length && !value.trim()) {
    return false;
  } else if (!value || alphabateRegex.test(value)) {
    return true;
  }
  return false;
};

export const EmailAddressValidator = (value) => {
  if (value) {
    return emailRegex.test(value);
  }
  return true;
};

export const NumericValidator = (value) => {
  // const numericRegex = /^[0-9]+$/;
  if (!value || numericRegex.test(value)) {
    return true;
  }
  return false;
};

export const PhoneNumberValidator = (value) => {
  if (value) {
    return phoneNumberRegex.test(value);
  }
  return true;
};
