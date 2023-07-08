import 'dotenv/config';
import { httpServer } from './httpServer';
import { createWsServer } from './wsServer';
import { config } from './config';

const { PORT_HTTP, PORT_WS } = config();

httpServer.listen(PORT_HTTP, () => {
  console.log(`✨ Frontend server is running on port ${PORT_HTTP}`);
});

const wsServer = createWsServer(PORT_WS);

process.on('SIGINT', () => {
  console.log(`\n💤 Shutting down all the servers`);
  httpServer.close(() => {
    console.log('✅ Http server closed');
  });

  wsServer.close(() => {
    console.log('✅ WebSocket server closed');
  });
  setImmediate(() => process.exit());
});
