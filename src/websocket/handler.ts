import { MES_TYPES } from '../const';
import { registerUserHandler } from './register';
import { createRoomHandler, addUserToRoomHandler } from './rooms';
import { ResReqBase, WebSocketServer } from './types';
import { updateRoomsHandler } from './rooms';
import {
  addShipsToGameHandler,
  attackHandler,
  randomAttackHandler,
} from './game';

export const handler = async (
  wsServer: WebSocketServer,
  message: string,
  connectionId: number
): Promise<ResReqBase | undefined> => {
  let response: ResReqBase | undefined;

  try {
    const reqObj = JSON.parse(message) as ResReqBase;

    switch (reqObj.type) {
      case MES_TYPES.REG:
        response = await registerUserHandler(reqObj, connectionId);
        break;
      case MES_TYPES.CREATE_ROOM:
        await createRoomHandler(connectionId);
        await updateRoomsHandler(wsServer);
        break;
      case MES_TYPES.ADD_TO_ROOM:
        await addUserToRoomHandler(wsServer, reqObj, connectionId);
        await updateRoomsHandler(wsServer);
        break;
      case MES_TYPES.ADD_SHIPS:
        await addShipsToGameHandler(wsServer, reqObj);
        break;
      case MES_TYPES.ATTACK:
        await attackHandler(wsServer, reqObj);
        break;
      case MES_TYPES.RANDOM_ATTACK:
        await randomAttackHandler(wsServer, reqObj);
        break;
      default:
        return response;
    }
  } catch (error) {
    response = {
      type: MES_TYPES.ERROR,
      data: JSON.stringify({ error: true, errorText: error.message }),
      id: 0,
    };
  } finally {
    return response;
  }
};
