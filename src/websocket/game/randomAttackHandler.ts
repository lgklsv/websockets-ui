import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketServer } from '../types';
import { attack } from './attack';
import { generateRandomAttackCords } from './helpers';

export const randomAttackHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestRandomAttack;

  const game = await db.getGameById(gameId);
  if (!game) return;

  const opponentGameFiled = await db.getOpponentGameField(gameId, indexPlayer);
  if (!opponentGameFiled) return;

  const { x, y } = generateRandomAttackCords(opponentGameFiled);
  await attack(wsServer, gameId, indexPlayer, x, y);
};
