import { MES_TYPES } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';

export const finishGame = async (
  wsServer: WebSocketServer,
  game: Game,
  winnerId: number
) => {
  wsServer.clients.forEach((client: WebSocketWithId) => {
    game.players.forEach((player) => {
      if (client.id === player.index) {
        client.send(
          JSON.stringify({
            type: MES_TYPES.FINISH,
            data: JSON.stringify({ winPlayer: winnerId }),
            id: 0,
          })
        );
      }
    });
  });
};
