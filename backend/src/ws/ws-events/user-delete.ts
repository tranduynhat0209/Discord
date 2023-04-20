import { WSEvent } from '.';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { Entity, UserTypes, WS } from '../../types';

export default class implements WSEvent<'USER_DELETE'> {
  public on = 'USER_DELETE' as const;

  public async invoke(ws: WebSocket, client: Socket, { token }: WS.Params.UserDelete) {
    return [];
  }
}