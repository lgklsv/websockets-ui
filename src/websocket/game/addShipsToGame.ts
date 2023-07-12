import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketServer } from '../types';
import { GAME_STAGES } from './readyGameStages';
import { startGameHandler } from './startGame';
import { turnHandler } from './turn';

export const addShipsToGameHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, ships, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestAddShips;

  const game = await db.getGameById(gameId);
  if (!game) return;

  if (game.readyStage === GAME_STAGES.INIT) {
    const updatedPlayers = game.players.map((player) => {
      if (player.index === indexPlayer) {
        return { index: player.index, ships };
      }
      return player;
    });

    await db.updateGameById(gameId, {
      ...game,
      players: updatedPlayers,
      readyStage: 'one_ready',
    });
  } else if (game.readyStage === GAME_STAGES.ONE_READY) {
    await db.updateGameById(gameId, { ...game, readyStage: 'both_ready' });
    startGameHandler(wsServer, game);
    turnHandler(wsServer, game);
  }
};
