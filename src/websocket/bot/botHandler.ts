import { db } from '../../db/AppDb';
import { generateId } from '../../utils';
import { createGame } from '../game';
import { WebSocketServer } from '../types';

export const botHandler = async (
  wsServer: WebSocketServer,
  singlePlayerId: number
) => {
  const user = await db.getUserById(singlePlayerId);
  if (!user) return;

  await createGame(wsServer, [
    user,
    { index: generateId(), name: 'bot', isBot: true },
  ]);
};
