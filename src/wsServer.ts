import WebSocket from 'ws';
import { handler } from './websocket/handler';
import { IncomingMessage } from 'http';

export const createWsServer = (
  port: number
): WebSocket.Server<typeof WebSocket, typeof IncomingMessage> => {
  const wsServer = new WebSocket.Server({ port });

  wsServer.on('listening', () => {
    console.log(`🚀 WS server is running on port ${port}`);
  });

  wsServer.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', async (msg) => {
      const stringData = msg.toString('utf8');

      const res = await handler(stringData);
      console.log(res);
      ws.send(res);
    });

    ws.send('Hello this is welcome message');
  });
  return wsServer;
};
