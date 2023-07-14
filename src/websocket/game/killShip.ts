import { MES_TYPES, SHIP_STATUS } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';

export const killShipHandler = (
  wsServer: WebSocketServer,
  players: PlayersInGame,
  curPlayerIdx: number,
  oppGameField: GameCell[][],
  ship: Ship
) => {
  // Vertical
  if (ship.direction) {
    for (let i = 0; i < ship.length; i++) {
      for (let n = -1; n < 2; n++) {
        for (let k = -1; k < 2; k++) {
          const posX = ship.position.x + n;
          const posY = ship.position.y + i + k;
          if (
            oppGameField[posX] &&
            oppGameField[posX][posY] &&
            oppGameField[posX][posY].status === 'init'
          ) {
            oppGameField[posX][posY].status = SHIP_STATUS.MISS;

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

      oppGameField[ship.position.x][ship.position.y + i].status =
        SHIP_STATUS.KILLED;

      wsServer.clients.forEach((client: WebSocketWithId) => {
        players.forEach((player) => {
          if (client.id === player.index) {
            client.send(
              JSON.stringify({
                type: MES_TYPES.ATTACK,
                data: JSON.stringify({
                  position: { x: ship.position.x, y: ship.position.y + i },
                  currentPlayer: curPlayerIdx,
                  status: SHIP_STATUS.KILLED,
                }),
                id: 0,
              })
            );
          }
        });
      });
    }
  }
  // Horizontal
  else {
    for (let i = 0; i < ship.length; i++) {
      for (let n = -1; n < 2; n++) {
        for (let k = -1; k < 2; k++) {
          const posX = ship.position.x + i + n;
          const posY = ship.position.y + k;
          if (
            oppGameField[posX] &&
            oppGameField[posX][posY] &&
            oppGameField[posX][posY].status === 'init'
          ) {
            oppGameField[posX][posY].status = SHIP_STATUS.MISS;

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

      oppGameField[ship.position.x + i][ship.position.y].status =
        SHIP_STATUS.KILLED;

      wsServer.clients.forEach((client: WebSocketWithId) => {
        players.forEach((player) => {
          if (client.id === player.index) {
            client.send(
              JSON.stringify({
                type: MES_TYPES.ATTACK,
                data: JSON.stringify({
                  position: { x: ship.position.x + i, y: ship.position.y },
                  currentPlayer: curPlayerIdx,
                  status: SHIP_STATUS.KILLED,
                }),
                id: 0,
              })
            );
          }
        });
      });
    }
  }
};
