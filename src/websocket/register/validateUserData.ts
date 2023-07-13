import { ERROR_MES } from '../../const';
import { db } from '../../db/AppDb';
import { AppError } from '../../errors/AppError';

export const validateUserData = async (name: string, password: string) => {
  if (await db.getUser(name)) {
    throw new AppError('reg', ERROR_MES.USER_EXISTS);
  }

  if (name.length < 5) {
    throw new AppError('reg', ERROR_MES.INVALID_USERNAME);
  }

  if (!/^[A-Za-z]\w{5,16}$/.test(password)) {
    throw new AppError('reg', ERROR_MES.INVALID_PASSWORD);
  }
};
