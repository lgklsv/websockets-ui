import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';
import { WebSocketServer } from '../types';

export const updateRoomsHandler = async (
  wsServer: WebSocketServer
): Promise<void> => {
  const rooms = await db.updateRooms();

  wsServer.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: MES_TYPES.UPDATE_ROOM,
        data: JSON.stringify(rooms),
        id: 0,
      })
    );
  });
};
