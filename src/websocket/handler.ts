import { MES_TYPES } from '../const';
import { registerUser } from './register';
import { createRoom } from './rooms';

export const handler = async (
  message: string,
  connectionId: number
): Promise<ResReqBase> => {
  let response: ResReqBase;

  try {
    const reqObj = JSON.parse(message) as ResReqBase;

    switch (reqObj.type) {
      case MES_TYPES.REG:
        response = await registerUser(reqObj, connectionId);
        break;
      case MES_TYPES.CREATE_ROOM:
        response = await createRoom(connectionId);
        break;
      default:
      // TODO handle error when type does not exist
      // return message;
    }
  } catch (error) {
    response = {
      type: MES_TYPES.ERROR,
      data: JSON.stringify({ error: true, errorText: 'Internal server error' }),
      id: 0,
    };
  } finally {
    return response;
  }
};
