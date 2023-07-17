import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketServer } from '../types';
import { attack } from './attack';
import { generateRandomAttackCords } from './helpers';

export const attackHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestAttack;

  const success = await attack(wsServer, gameId, indexPlayer, x, y);

  const game = await db.getGameById(gameId);
  if (!game) return;

  // Bot
  if (game.singlePlay && success) {
    const opponentGameFiled = await db.getOpponentGameField(
      gameId,
      indexPlayer
    );
    if (!opponentGameFiled) return;

    const playerGameField = game.players[0].gameField;
    const { x: botX, y: botY } = generateRandomAttackCords(playerGameField);

    await attack(wsServer, gameId, game.players[1].index, botX, botY);
  }
};
