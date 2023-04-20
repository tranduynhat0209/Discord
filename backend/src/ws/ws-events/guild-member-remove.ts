import { WS } from '../../types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent, } from '.';

export default class implements WSEvent<'GUILD_MEMBER_REMOVE'> {
  public on = 'GUILD_MEMBER_REMOVE' as const;

  public async invoke(ws: WebSocket, client: Socket, { guildId, userId }: WS.Params.GuildMemberRemove) {
    return []
  }
}
