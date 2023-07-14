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
      oppGameField[ship.position.x + 1][ship.position.y].status =
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
