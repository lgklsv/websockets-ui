import WebSocket from 'ws';
import { handler } from './websocket/handler';
import { IncomingMessage } from 'http';
import { generateId } from './utils';

export const createWsServer = (
  port: number
): WebSocket.Server<typeof WebSocket, typeof IncomingMessage> => {
  const wsServer = new WebSocket.Server({ port });

  wsServer.on('listening', () => {
    console.log(`🚀 WS server is running on port ${port}`);
  });

  wsServer.on('connection', (ws) => {
    console.log('New client connected');
    const connectionId = generateId();
    console.log(connectionId);
    ws.on('message', async (msg) => {
      const stringData = msg.toString('utf8');

      const res = await handler(stringData, connectionId);
      console.log(res);
      ws.send(res);
    });
  });
  return wsServer;
};
