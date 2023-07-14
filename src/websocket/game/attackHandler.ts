import { ResReqBase, WebSocketServer } from '../types';
import { attack } from './attack';

export const attackHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestAttack;

  await attack(wsServer, gameId, indexPlayer, x, y);
};
