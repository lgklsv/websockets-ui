import { db } from '../../db/AppDb';
import { getRandomNumberFromTo } from '../../utils';
import { ResReqBase, WebSocketServer } from '../types';
import { attack } from './attack';
import { isAttackValid } from './helpers';

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

  let x: number;
  let y: number;
  do {
    x = getRandomNumberFromTo(0, 9);
    y = getRandomNumberFromTo(0, 9);
  } while (!isAttackValid(opponentGameFiled, x, y));

  await attack(wsServer, gameId, indexPlayer, x, y);
};
