import { MES_TYPES, SHIP_STATUS } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';

export const addMissedAfterKill = (
  wsServer: WebSocketServer,
  x: number,
  y: number,
  gameField: GameCell[][],
  players: PlayersInGame,
  curPlayerIdx: number
) => {
  for (let n = -1; n < 2; n++) {
    for (let k = -1; k < 2; k++) {
      const posX = x + n;
      const posY = y + k;
      if (
        gameField[posX] &&
        gameField[posX][posY] &&
        gameField[posX][posY].status === 'init'
      ) {
        gameField[posX][posY].status = SHIP_STATUS.MISS;

        wsServer.clients.forEach((client: WebSocketWithId) => {
          players.forEach((player) => {
            if (client.id === player.index) {
              client.send(
                JSON.stringify({
                  type: MES_TYPES.ATTACK,
                  data: JSON.stringify({
                    position: {
                      x: posX,
                      y: posY,
                    },
                    currentPlayer: curPlayerIdx,
                    status: SHIP_STATUS.MISS,
                  }),
                  id: 0,
                })
              );
            }
          });
        });
      }
    }
  }
};
