import { Socket } from "socket.io";

export class WSRooms {
  public async join(client: Socket, user: any) {
    const alreadyJoinedRooms = client.rooms.size > 1;
    if (alreadyJoinedRooms) return;

    await this.joinGuildRooms(user, client);
  }

  public async joinGuildRooms(user: any, client: Socket) {
    if (!user.guildIds.length) return;

    await client.join(user.guildIds);
    const channelIds = await this.getChannelIds(client, user.guildIds);
    await client.join(channelIds);
  }

  private async getChannelIds(client: Socket, guildIds: string[]) {
    return [];
  }
}
