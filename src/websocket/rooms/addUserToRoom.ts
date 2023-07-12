import WebSocket from 'ws';
import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketWithId } from '../types';
import { IncomingMessage } from 'http';

export const addUserToRoomHandler = async (
  wsServer: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>,
  reqBody: ResReqBase,
  connectionId: number
): Promise<void> => {
  const { indexRoom } = JSON.parse(reqBody.data) as RequestAdd;

  const user = await db.getUserById(connectionId);
  if (user) {
    const { user1, user2 } = await db.addUserToRoom(indexRoom, user);
    console.log(user1, user2);

    if (user1 && user2) {
      wsServer.clients.forEach((client: WebSocketWithId) => {
        console.log(client.id);
        if (client.id === user1.index || client.id === user2.index) {
          client.send(
            JSON.stringify({
              type: MES_TYPES.CREATE_GAME,
              data: JSON.stringify({
                idGame: user1.index,
                idPlayer: user2.index,
              }),
              id: 0,
            })
          );
        }
      });
    }
  }
};
