import { ERROR_MES } from '../../const';
import { AppError } from '../../errors/AppError';

export const validateUserData = (name: string, password: string) => {
  if (name.length < 5) {
    throw new AppError('reg', ERROR_MES.INVALID_USERNAME);
  }

  if (!/^[A-Za-z]\w{5,16}$/.test(password)) {
    throw new AppError('reg', ERROR_MES.INVALID_PASSWORD);
  }
};
