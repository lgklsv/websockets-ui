import { db } from '../../db/AppDb';
import { createGame } from '../game';
import { ResReqBase, WebSocketServer } from '../types';

export const addUserToRoomHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase,
  connectionId: number
): Promise<void> => {
  const { indexRoom } = JSON.parse(reqBody.data) as RequestAdd;

  const user = await db.getUserById(connectionId);
  if (user) {
    const { user1, user2 } = await db.addUserToRoom(indexRoom, user);

    if (user1 && user2) {
      await createGame(wsServer, [user1, user2]);
    }
  }
};
