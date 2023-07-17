import { MES_TYPES } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';

export const turnHandler = (wsServer: WebSocketServer, game: Game) => {
  wsServer.clients.forEach((client: WebSocketWithId) => {
    game.players.forEach((player) => {
      if (client.id === player.index) {
        client.send(
          JSON.stringify({
            type: MES_TYPES.TURN,
            data: JSON.stringify({ currentPlayer: game.turn }),
            id: 0,
          })
        );
      }
    });
  });
};
