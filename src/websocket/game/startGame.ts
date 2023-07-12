import { MES_TYPES } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';

export const startGameHandler = (wsServer: WebSocketServer, game: Game) => {
  wsServer.clients.forEach((client: WebSocketWithId) => {
    game.players.forEach((player) => {
      if (client.id === player.index) {
        client.send(
          JSON.stringify({
            type: MES_TYPES.START_GAME,
            data: JSON.stringify({
              ships: player.ships,
              currentPlayerIndex: player.index,
            }),
            id: 0,
          })
        );
      }
    });
  });
};
