export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-={}|:"<>?,./]).{8,16}$/;

export const PHONE_NUMBER_REGEX = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;

export const PASSWORD_HASH_SALT = 10;
