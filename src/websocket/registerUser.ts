import { db } from '../db/AppDb';

export const registerUser = async (
  reqBody: ResReqBase,
  connectionId: number
): Promise<ResReqBase> => {
  const { name, password } = JSON.parse(reqBody.data) as RequestReg;

  // TODO: add validation
  if (await db.getUser(name)) {
    return {
      ...reqBody,
      data: JSON.stringify({
        name,
        index: connectionId,
        error: true,
        errorText: 'This user already exits',
      }),
    };
  }
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
};
