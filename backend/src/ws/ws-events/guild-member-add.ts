import { WS } from '../../types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent, } from '.';

export default class implements WSEvent<'GUILD_MEMBER_ADD'> {
  public on = 'GUILD_MEMBER_ADD' as const;

  public async invoke(ws: WebSocket, client: Socket, { inviteCode }: WS.Params.GuildMemberAdd) {
    
    return [];
  }
}
