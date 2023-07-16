import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketServer } from '../types';
import { populateGameField } from './helpers';
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

  const updatedPlayers = game.players.map((player) => {
    if (player.index === indexPlayer) {
      return {
        index: player.index,
        gameField: populateGameField(player.gameField, ships),
        ships,
      };
    }
    return player;
  });

  // Bot
  if (game.singlePlay) {
    await db.updateGameById(gameId, {
      ...game,
      players: updatedPlayers,
      readyStage: 'both_ready',
    });
    startGameHandler(wsServer, game);
    turnHandler(wsServer, game);
    return;
  }

  if (game.readyStage === GAME_STAGES.INIT) {
    await db.updateGameById(gameId, {
      ...game,
      players: updatedPlayers,
      readyStage: 'one_ready',
    });
  } else if (game.readyStage === GAME_STAGES.ONE_READY) {
    await db.updateGameById(gameId, {
      ...game,
      players: updatedPlayers,
      readyStage: 'both_ready',
    });
    startGameHandler(wsServer, game);
    turnHandler(wsServer, game);
  }
};
