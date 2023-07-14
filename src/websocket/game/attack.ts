import { MES_TYPES, SHIP_STATUS } from '../../const';
import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketServer, WebSocketWithId } from '../types';
import { isKilled } from './helpers';
import { killShipHandler } from './killShip';

export const attackHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestAttack;

  const game = await db.getGameById(gameId);
  if (!game) return;

  // Check if turn is on current player
  if (game.turn !== indexPlayer) return;

  const opponentPlayer = game.players.find(
    (player) => player.index !== indexPlayer
  );
  if (!opponentPlayer) return;

  const cell = opponentPlayer.gameField[x][y];
  let status: ResCellStatus = SHIP_STATUS.MISS;

  // Prevent hitting some field again
  if (
    cell.status === SHIP_STATUS.MISS ||
    cell.status === SHIP_STATUS.SHOT ||
    cell.status === SHIP_STATUS.KILLED
  )
    return;

  const curShip = opponentPlayer.gameField[x][y].ship;
  if (cell.status === 'init') {
    opponentPlayer.gameField[x][y].status = SHIP_STATUS.MISS;
  } else if (cell.status === 'ship') {
    opponentPlayer.gameField[x][y].status = SHIP_STATUS.SHOT;
    status = SHIP_STATUS.SHOT;

    // Check if the ship is killed after the shot
    if (isKilled(curShip, opponentPlayer.gameField)) {
      console.log('killed');

      status = SHIP_STATUS.KILLED;
      killShipHandler(
        wsServer,
        game.players,
        indexPlayer,
        opponentPlayer.gameField,
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

  // TODO Check if we have a winner
  console.log(gameId, x, y, indexPlayer);
};
