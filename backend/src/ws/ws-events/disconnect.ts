import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from '.';

export default class implements WSEvent<'disconnect'> {
  public on = 'disconnect' as const;

  public async invoke(ws: WebSocket, client: Socket): Promise<any> {   
    
  }

  public async handleUser(ws: WebSocket, user: any) {
    const userConnected = ws.connectedUserIds.includes(user.id);    
    if (userConnected) return;

    user.status = 'OFFLINE';
    await user.save();

    return [{
      emit: 'PRESENCE_UPDATE' as const,
      to: user.guildIds,
      send: { userId: user.id, status: user.status },
    }];
  }
}
