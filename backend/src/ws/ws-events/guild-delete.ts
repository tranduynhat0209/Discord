import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { User } from "../../data/entity/User";
import { Message } from "../../data/entity/Message";
import { Guild } from "../../data/entity/Guild";
import { Guild_Member } from "../../data/entity/Guild-member";
import { Invite } from "../../data/entity/Invite";
import { Role } from "../../data/entity/Role";
import { Channel } from "../../data/entity/Channel";

export default class implements WSEvent<"GUILD_DELETE"> {
  public on = "GUILD_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { guildId }: WS.Params.GuildDelete
  ) {
    if (!guildId) throw new TypeError("Not enough options were provided");

    await deps.wsGuard.validateIsOwner(client, guildId);

    const users = await deps.guilds.getUsers(guildId);
    for (let user of users) {
      const index = user.guildIds.indexOf(guildId);
      user.guildIds.splice(index, 1);
      await deps.users.save(user);
    }

    const channels = await deps.guilds.getChannels(guildId);
    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where("channelId IN (:...ids)", { ids: channels.map((c) => c.id) })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Guild)
      .where("id = :id", { id: guildId })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Guild_Member)
      .where("guildid = :id", { id: guildId })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Invite)
      .where("guildId = :id", { id: guildId })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Role)
      .where("guildId = :id", { id: guildId })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Channel)
      .where("guildId = :id", { id: guildId })
      .execute();

    return [
      {
        emit: this.on,
        to: [guildId],
        send: { guildId } as WS.Args.GuildDelete,
      },
    ];
  }
}
