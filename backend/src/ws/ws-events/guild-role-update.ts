import { WS } from '../../types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent, } from '.';

export default class implements WSEvent<'GUILD_ROLE_UPDATE'> {
  public on = 'GUILD_ROLE_UPDATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { roleId, guildId, name, color, permissions, hoisted }: WS.Params.GuildRoleUpdate) {
    await deps.wsGuard.validateCan(client, guildId, 'MANAGE_ROLES');

    return [];
  }
}