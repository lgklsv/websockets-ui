import { ERROR_MES } from '../../const';
import { AppError } from '../../errors/AppError';

export const validateExistingUser = (user: User, password: string) => {
  if (user.loggedIn) {
    throw new AppError('reg', ERROR_MES.USER_LOGGED_IN);
  }

  if (user.password !== password) {
    throw new AppError('reg', ERROR_MES.WRONG_PASSWORD);
  }
};
