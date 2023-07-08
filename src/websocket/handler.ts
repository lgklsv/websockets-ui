import { MES_TYPES } from '../const';
import { registerUser } from './registerUser';

export const handler = async (
  message: string,
  connectionId: number
): Promise<string> => {
  let response = message;

  try {
    const reqObj = JSON.parse(message) as ResReqBase;

    switch (reqObj.type) {
      case MES_TYPES.REG:
        const regRes = await registerUser(reqObj, connectionId);
        response = JSON.stringify(regRes);
        break;
      default:
        // TODO handle error when type does not exist
        return message;
    }
  } catch (error) {
    response = JSON.stringify({ error: 'Internal server error' });
  } finally {
    return response;
  }
};
