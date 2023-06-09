import { Socket } from "socket.io";
import { Channel } from "../../data/entity/Channel";
import { SelfUserDocument } from "../../data/entity/User";

export class WSRooms {
  public async join(client: Socket, user: SelfUserDocument) {
    const alreadyJoinedRooms = client.rooms.size > 1;
    if (alreadyJoinedRooms) return;

    await this.joinGuildRooms(user, client);
  }

  public async joinGuildRooms(user: SelfUserDocument, client: Socket) {
    if (!user.guildIds.length) return;

    await client.join(user.guildIds);
    const channelIds = await this.getChannelIds(client, user.guildIds);
    await client.join(channelIds);
    await client.join(user.id);
  }

  private async getChannelIds(client: Socket, guildIds: string[]) {
    const channels = await deps.dataSource
      .getRepository(Channel)
      .createQueryBuilder("channel")
      .where("channel.guildId IN (:...guildIds)", { guildIds: guildIds })
      .getMany();
    const ids: string[] = channels.map((c) => c.id);
    // for (const channel of channels)
    // try {
    //   if (channel.type === "VOICE") continue;
    //   await deps.wsGuard.validateCanInChannel(
    //     client,
    //     channel.id,
    //     "READ_MESSAGES"
    //   );
    //   ids.push(channel.id);
    // } catch {}
    return ids;
  }
}
