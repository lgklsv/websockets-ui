import { DEFAULT_PORT_HTTP, DEFAULT_PORT_WS, DEFAULT_HOST } from './const';

export const config = () => {
  const PORT_HTTP = Number(process.env.PORT_HTTP) || DEFAULT_PORT_HTTP;
  const PORT_WS = Number(process.env.PORT_WS) || DEFAULT_PORT_WS;
  const HOST = process.env.HOST || DEFAULT_HOST;
  return { PORT_HTTP, PORT_WS, HOST };
};
