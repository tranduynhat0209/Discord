import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent, } from '.';
import { WS } from '../../types';

export default class implements WSEvent<'GUILD_ROLE_DELETE'> {
  public on = 'GUILD_ROLE_DELETE' as const;

  public async invoke(ws: WebSocket, client: Socket, { guildId, roleId }: WS.Params.GuildRoleDelete) {
    const role = await deps.roles.get(roleId);
    await deps.wsGuard.validateCan(client, guildId, 'MANAGE_ROLES');

    return [];
  }
}
