import { db } from '../../db/AppDb';
import { AppError } from '../../errors/AppError';
import { RequestReg, ResReqBase } from '../types';
import { validateUserData } from './validateUserData';

export const registerUser = async (
  reqBody: ResReqBase,
  connectionId: number
): Promise<ResReqBase> => {
  const { name, password } = JSON.parse(reqBody.data) as RequestReg;

  try {
    await validateUserData(name, password);

    db.addUser({ name, password, index: connectionId });

    return {
      ...reqBody,
      data: JSON.stringify({
        name: name,
        index: connectionId,
        error: false,
        errorText: '',
      }),
    };
  } catch (err) {
    if (err instanceof AppError) {
      return {
        ...reqBody,
        data: JSON.stringify({
          name,
          index: connectionId,
          error: true,
          errorText: err.message,
        }),
      };
    }
  }
};
