import { ResReqBase, WebSocketServer } from '../types';

export const attackHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestAttack;

  console.log(gameId, x, y, indexPlayer);
};
