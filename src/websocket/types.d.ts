import { IncomingMessage } from 'http';
import { MES_TYPES } from '../const';
import WebSocket from 'ws';

export type AvailableMesTypes = `${MES_TYPES}`;

export interface ResReqBase {
  type: AvailableMesTypes;
  data: string;
  id: 0;
}

export type WebSocketWithId = WebSocket & { id: number };

export type WebSocketServer = WebSocket.Server<
  typeof WebSocket,
  typeof IncomingMessage
>;
