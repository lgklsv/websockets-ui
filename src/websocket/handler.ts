import WebSocket from 'ws';
import { ERROR_MES, MES_TYPES } from '../const';
import { registerUserHandler } from './register';
import { createRoomHandler, addUserToRoomHandler } from './rooms';
import { ResReqBase } from './types';
import { IncomingMessage } from 'http';
import { updateRoomsHandler } from './rooms/updateRooms';

export const handler = async (
  wsServer: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>,
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
        response = await addUserToRoomHandler(reqObj, connectionId);
        await updateRoomsHandler(wsServer);
        break;
      default:
        return response;
    }
  } catch (error) {
    response = {
      type: MES_TYPES.ERROR,
      data: JSON.stringify({ error: true, errorText: ERROR_MES.INTERNAL }),
      id: 0,
    };
  } finally {
    return response;
  }
};
