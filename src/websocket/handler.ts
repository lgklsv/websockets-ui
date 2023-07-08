import { MES_TYPES } from '../const';
// import { registerUser } from './registerUser';

export const handler = async (
  message: string,
  connectionId: number
): Promise<string> => {
  try {
    const reqObj = JSON.parse(message) as RequestObj;
    let response = message;
    switch (reqObj.type) {
      case MES_TYPES.REG:
        // response = await registerUser(reqObj, connectionId);
        break;
      default:
        // TODO handle error when type does not exist
        return message;
    }
    return JSON.stringify(response);
  } catch (error) {
    console.log('Ошибка', error);
  }
};
