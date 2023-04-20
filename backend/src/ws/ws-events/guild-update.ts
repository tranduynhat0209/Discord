import { WS, Entity } from '../../types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from '.';

export default class implements WSEvent<'GUILD_UPDATE'> {
  public on = 'GUILD_UPDATE' as const;

  public async invoke(ws: WebSocket, client: Socket, { guildId, name, iconURL, systemChannelId }: WS.Params.GuildUpdate) {
    await deps.wsGuard.validateCan(client, guildId, 'MANAGE_GUILD');

    return [];
  }
}
