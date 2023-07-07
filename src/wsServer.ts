import WebSocket from 'ws';

export const createWsServer = (port: number) => {
  const wsServer = new WebSocket.Server({ port });

  wsServer.on('listening', () => {
    console.log(`🚀 WS server is running on port ${port}`);
  });

  wsServer.on('connection', (ws) => {
    console.log('New client connected');

    ws.send('Hello this is welcome message');
  });
};
