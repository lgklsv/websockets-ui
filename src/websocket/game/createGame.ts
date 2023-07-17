import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';
import { WebSocketServer, WebSocketWithId } from '../types';

export const createGame = async (
  wsServer: WebSocketServer,
  players: Player[]
) => {
  const gameId = await db.createGame(players);

  wsServer.clients.forEach((client: WebSocketWithId) => {
    players.forEach((player) => {
      if (client.id === player.index) {
        client.send(
          JSON.stringify({
            type: MES_TYPES.CREATE_GAME,
            data: JSON.stringify({
              idGame: gameId,
              idPlayer: player.index,
            }),
            id: 0,
          })
        );
      }
    });
  });
};
