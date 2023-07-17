import { MES_TYPES } from '../../const';
import { db } from '../../db/AppDb';
import { sendResponseToAll } from '../responseHelpers';
import { WebSocketServer } from '../types';

export const updateWinnersHandler = async (wsServer: WebSocketServer) => {
  const winners = await db.getWinners();
  if (!winners) return;

  sendResponseToAll(
    wsServer,
    MES_TYPES.UPDATE_WINNERS,
    JSON.stringify(winners)
  );
};
