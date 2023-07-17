import { db } from '../../db/AppDb';
import { AppError } from '../../errors/AppError';
import { ResReqBase } from '../types';
import { validateExistingUser } from './validateExistingUser';
import { validateUserData } from './validateUserData';

export const registerUserHandler = async (
  reqBody: ResReqBase,
  connectionId: number
): Promise<ResReqBase> => {
  const { name, password } = JSON.parse(reqBody.data) as RequestReg;

  try {
    // Basic validation
    validateUserData(name, password);

    const user = await db.getUser(name);

    // Register user
    if (!user) {
      await db.addUser({
        name,
        password,
        index: connectionId,
        loggedIn: true,
      });
    }
    // Login user
    else {
      validateExistingUser(user, password);
      await db.loginUser(name, connectionId);
    }

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
