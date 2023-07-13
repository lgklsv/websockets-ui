import { MES_TYPES, SHIP_STATUS } from '../../const';
import { db } from '../../db/AppDb';
import { ResReqBase, WebSocketServer, WebSocketWithId } from '../types';

export const attackHandler = async (
  wsServer: WebSocketServer,
  reqBody: ResReqBase
) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(
    reqBody.data
  ) as RequestAttack;

  const game = await db.getGameById(gameId);
  if (!game) return;

  const opponentPlayer = game.players.find(
    (player) => player.index !== indexPlayer
  );
  if (!opponentPlayer) return;

  const cell = opponentPlayer.gameField[x][y];
  let status: ResCellStatus = SHIP_STATUS.MISS;
  if (cell.status === 'init') {
    opponentPlayer.gameField[x][y].status = SHIP_STATUS.MISS;
  } else if (cell.status === 'ship') {
    opponentPlayer.gameField[x][y].status = SHIP_STATUS.SHOT;
    status = SHIP_STATUS.SHOT;
  }

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

  console.log(gameId, x, y, indexPlayer);
};
