export enum ERROR_MES {
  INVALID_PASSWORD = 'Password should be from 7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter',
  WRONG_PASSWORD = 'Password for this user is not correct',
  INVALID_USERNAME = 'Name should be at least 5 characters',
  USER_EXISTS = 'This user already exits',
  USER_LOGGED_IN = 'This user is already logged in',
}
