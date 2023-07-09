import WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';

export const updateRoomsHandler = async (
  wsServer: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>
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
