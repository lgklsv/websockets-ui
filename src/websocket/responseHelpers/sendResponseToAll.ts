import { MES_TYPES } from '../../const';
import { WebSocketServer } from '../types';

export const sendResponseToAll = (
  wsServer: WebSocketServer,
  type: `${MES_TYPES}`,
  data: string
) => {
  wsServer.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type,
        data,
        id: 0,
      })
    );
  });
};
