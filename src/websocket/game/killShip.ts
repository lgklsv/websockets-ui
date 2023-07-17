import { MES_TYPES, SHIP_STATUS } from '../../const';
import { WebSocketServer, WebSocketWithId } from '../types';
import { addMissedAfterKill } from './addMissedAfterKill';

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
      const posX = ship.position.x;
      const posY = ship.position.y + i;

      addMissedAfterKill(
        wsServer,
        posX,
        posY,
        oppGameField,
        players,
        curPlayerIdx
      );

      oppGameField[posX][posY].status = SHIP_STATUS.KILLED;

      wsServer.clients.forEach((client: WebSocketWithId) => {
        players.forEach((player) => {
          if (client.id === player.index) {
            client.send(
              JSON.stringify({
                type: MES_TYPES.ATTACK,
                data: JSON.stringify({
                  position: { x: posX, y: posY },
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
      const posX = ship.position.x + i;
      const posY = ship.position.y;

      addMissedAfterKill(
        wsServer,
        posX,
        posY,
        oppGameField,
        players,
        curPlayerIdx
      );

      oppGameField[posX][posY].status = SHIP_STATUS.KILLED;

      wsServer.clients.forEach((client: WebSocketWithId) => {
        players.forEach((player) => {
          if (client.id === player.index) {
            client.send(
              JSON.stringify({
                type: MES_TYPES.ATTACK,
                data: JSON.stringify({
                  position: { x: posX, y: posY },
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
