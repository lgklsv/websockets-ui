import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';
import { sendResponseToAll } from '../responseHelpers';
import { WebSocketServer } from '../types';

export const updateRoomsHandler = async (
  wsServer: WebSocketServer
): Promise<void> => {
  const rooms = await db.updateRooms();

  sendResponseToAll(wsServer, MES_TYPES.UPDATE_ROOM, JSON.stringify(rooms));
};
