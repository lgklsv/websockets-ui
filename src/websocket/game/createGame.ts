import { MES_TYPES } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';

export const createGame = (wsServer: WebSocketServer, players: Player[]) => {
  wsServer.clients.forEach((client: WebSocketWithId) => {
    if (client.id === players[0].index || client.id === players[1].index) {
      client.send(
        JSON.stringify({
          type: MES_TYPES.CREATE_GAME,
          data: JSON.stringify({
            idGame: players[0].index,
            idPlayer: players[1].index,
          }),
          id: 0,
        })
      );
    }
  });
};
