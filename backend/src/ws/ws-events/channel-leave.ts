import { WSEvent } from '.';
import { WebSocket } from '../websocket';
import { Socket } from 'socket.io';

export default class implements WSEvent<'CHANNEL_LEAVE'> {
  public on = 'CHANNEL_LEAVE' as const;

  public async invoke(ws: WebSocket, client: Socket) {
    const userId = ws.sessions.get(client.id);
    const user = await deps.users.getSelf(userId);

    const oldChannel = await deps.channels.getSafely(user.voice.channelId);
    if (!oldChannel) return [];
  
    return [];
  }
}