import WebSocket from 'ws';
import { handler } from './websocket/handler';
import { IncomingMessage } from 'http';
import { generateId } from './utils';
import { WebSocketWithId } from './websocket/types';
import { updateRoomsHandler } from './websocket/rooms';

export const createWsServer = (
  port: number
): WebSocket.Server<typeof WebSocket, typeof IncomingMessage> => {
  const wsServer = new WebSocket.Server({ port });

  wsServer.on('listening', () => {
    console.log(`🚀 WS server is running on port ${port}`);
  });

  wsServer.on('connection', (ws: WebSocketWithId) => {
    const connectionId = generateId();
    ws.id = connectionId;
    console.log(
      `🆕 Client with ID ${connectionId} connected to websocket server`
    );

    ws.on('message', async (msg) => {
      const stringData = msg.toString('utf8');

      const res = await handler(wsServer, stringData, connectionId);
      if (res) {
        ws.send(JSON.stringify(res));
      }
    });

    ws.on('close', async () => {
      // TODO clean up the connection
      await updateRoomsHandler(wsServer);

      console.log(`Client with ID ${ws.id} disconnected from websocket`);
    });
  });

  return wsServer;
};
