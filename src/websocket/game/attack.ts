import { MES_TYPES, SHIP_STATUS } from '../../const';
import { db } from '../../db/AppDb';
import { WebSocketServer, WebSocketWithId } from '../types';
import { finishGame } from './finishGame';
import { isKilled, isWinner } from './helpers';
import { killShipHandler } from './killShip';
import { turnHandler } from './turn';

export const attack = async (
  wsServer: WebSocketServer,
  gameId: number,
  indexPlayer: number,
  x: number,
  y: number
) => {
  const game = await db.getGameById(gameId);
  if (!game) return;

  // Check if turn is on current player
  if (game.turn !== indexPlayer) return;

  const opponentGameFiled = await db.getOpponentGameField(gameId, indexPlayer);
  if (!opponentGameFiled) return;

  const cell = opponentGameFiled[x][y];
  let status: ResCellStatus = SHIP_STATUS.MISS;

  // Prevent hitting some field again
  if (
    cell.status === SHIP_STATUS.MISS ||
    cell.status === SHIP_STATUS.SHOT ||
    cell.status === SHIP_STATUS.KILLED
  )
    return;

  const curShip = opponentGameFiled[x][y].ship;
  if (cell.status === 'init') {
    opponentGameFiled[x][y].status = SHIP_STATUS.MISS;
  } else if (cell.status === 'ship') {
    opponentGameFiled[x][y].status = SHIP_STATUS.SHOT;
    status = SHIP_STATUS.SHOT;

    // Check if the ship is killed after the shot
    if (isKilled(curShip, opponentGameFiled)) {
      console.log('killed');

      status = SHIP_STATUS.KILLED;
      killShipHandler(
        wsServer,
        game.players,
        indexPlayer,
        opponentGameFiled,
        curShip
      );
    }
  }

  if (status !== SHIP_STATUS.KILLED) {
    wsServer.clients.forEach((client: WebSocketWithId) => {
      game.players.forEach((player) => {
        if (client.id === player.index) {
          client.send(
            JSON.stringify({
              type: MES_TYPES.ATTACK,
              data: JSON.stringify({
                position: { x, y },
                currentPlayer: indexPlayer,
                status,
              }),
              id: 0,
            })
          );
        }
      });
    });
  }

  if (isWinner(opponentGameFiled)) {
    finishGame(wsServer, game, indexPlayer);
    return;
  }

  db.changeTurn(game.gameId);
  turnHandler(wsServer, game);
  console.log(gameId, x, y, indexPlayer);
};
