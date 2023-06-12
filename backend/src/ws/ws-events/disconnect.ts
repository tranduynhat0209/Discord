import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from '.';
import { User } from '../../data/entity/User';

export default class implements WSEvent<'disconnect'> {
  public on = 'disconnect' as const;

  public async invoke(ws: WebSocket, client: Socket): Promise<any> {   
    
  }

  public async handleUser(ws: WebSocket, user: User) {
    const userConnected = ws.connectedUserIds.includes(user.id);    
    if (userConnected) return;

    await deps.dataSource
      .createQueryBuilder()
      .update(User)
      .where("id = :id", { id: user.id })
      .set({ status: 'OFFLINE' })
      .execute();

    return [{
      emit: 'PRESENCE_UPDATE' as const,
      to: user.guildIds,
      send: { userId: user.id, status: 'OFFLINE' },
    }];
  }
}
