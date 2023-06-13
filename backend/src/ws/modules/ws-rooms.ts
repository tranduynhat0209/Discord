import { Socket } from "socket.io";
import { Channel } from "../../data/entity/Channel";

export class WSRooms {
  public async join(client: Socket, user: any) {
    const alreadyJoinedRooms = client.rooms.size > 1;
    if (alreadyJoinedRooms) return;

    await this.joinGuildRooms(user, client);
    await client.join(user.id);

    const dmIds = await this.getDMIds(client, user.id);
    await client.join(dmIds);
  }

  public async joinGuildRooms(user: any, client: Socket) {
    if (!user.guildIds.length) return;

    await client.join(user.guildIds);
    const channelIds = await this.getChannelIds(client, user.guildIds);
    await client.join(channelIds);
  }

  private async getChannelIds(client: Socket, guildIds: string[]) {
    const ids: string[] = [];
    const channels = await deps.dataSource
      .getRepository(Channel)
      .createQueryBuilder("channel")
      .where("channel.guildId IN (:...guildIds)", { guildIds: guildIds })
      .getMany();

    for (const channel of channels)
      try {
        if (channel.type === "VOICE") continue;
        await deps.wsGuard.validateCanInChannel(
          client,
          channel.id,
          "READ_MESSAGES"
        );
        ids.push(channel.id);
      } catch {}
    return ids;
  }

  private async getDMIds(client: Socket, userId: string) {
    const ids: string[] = [];
    const dms = await deps.dataSource
      .getRepository(Channel)
      .createQueryBuilder("dm")
      .where("dm.user0Id = :userId OR dm.user1Id = :user1Id", { userId })
      .getMany();

    for (const dm of dms) ids.push(dm.id);
    return ids;
  }
}
