import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Guild } from "../../data/entity/Guild";
import { User } from "../../data/entity/User";
import { Guild_Member } from "../../data/entity/Guild-member";

export default class implements WSEvent<"GUILD_MEMBER_REMOVE"> {
  public on = "GUILD_MEMBER_REMOVE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { guildId, userId }: WS.Params.GuildMemberRemove
  ) {
    const guild = await deps.guilds.get(guildId);
    const members = await deps.guilds.getMembers(guildId);
    const member = members.find((m) => m.userId === userId);
    if (!member) throw new TypeError("Member does not exist");

    const selfUserId = ws.sessions.get(client.id);
    if (guild.ownerId === member.userId)
      throw new TypeError("You cannot leave a guild you own");
    else if (selfUserId !== member.userId)
      await deps.wsGuard.validateCan(client, guildId, "KICK_MEMBERS");

    // TODO: validate user is higher before kicking them

    const user = await deps.users.get(member.userId);
    const index = user.guildIds.indexOf(guildId);
    user.guildIds.splice(index, 1);
    await deps.users.save(user);

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Guild_Member)
      .where("userId = :userId", { userId: userId })
      .andWhere("guildId = :guildId", { guildId: guildId })
      .execute();

    const targetClientId = ws.sessions.getClientIdFromUserId(userId);
    if (targetClientId) {
      const memberClient = ws.io.sockets.sockets.get(targetClientId);
      memberClient?.emit("GUILD_DELETE", { guildId } as WS.Args.GuildDelete);
      await client.leave(guildId);
    }

    await this.leaveGuildRooms(client, guild);

    return [
      await this.leaveGuildMessage(guild, user),
      {
        emit: this.on,
        to: [guildId],
        send: { memberId: member.id } as WS.Args.GuildMemberRemove,
      } ,
      {
        emit: "GUILD_DELETE" as const,
        to: [userId],
        send: { guildId } as WS.Args.GuildDelete,
      },
    ];
  }
  private async leaveGuildMessage(guild: Guild, user: User) {
    try {
      const sysMessage = await deps.messages.createSystem(
        guild.id,
        `<@${user.id}> left the guild.`,
        "GUILD_MEMBER_LEAVE"
      );

      return {
        emit: "MESSAGE_CREATE" as const,
        to: [guild.systemChannelId!],
        send: { message: sysMessage } as WS.Args.MessageCreate,
      };
    } catch {}
  }
  private async leaveGuildRooms(client: Socket, guild: Guild) {
    await client.leave(guild.id);
    const guildChannels = await deps.guilds.getChannels(guild.id);
    for (const channel of guildChannels) await client.leave(channel.id);
  }
}
