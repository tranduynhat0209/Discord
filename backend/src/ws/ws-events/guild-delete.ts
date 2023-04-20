import { WS } from '../../types';
import { Socket } from 'socket.io';
import { WebSocket } from '../websocket';
import { WSEvent } from '.';

export default class implements WSEvent<'GUILD_DELETE'> {
  public on = 'GUILD_DELETE' as const;

  public async invoke(ws: WebSocket, client: Socket, { guildId }: WS.Params.GuildDelete) {
    if (!guildId)
      throw new TypeError('Not enough options were provided');

    await deps.wsGuard.validateIsOwner(client, guildId);

    return [{
      emit: this.on,
      to: [guildId],
      send: { guildId },
    }];
  }
}
