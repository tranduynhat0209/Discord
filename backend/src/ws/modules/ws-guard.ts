import { Socket } from "socket.io";
import { PermissionTypes, getPermString } from "../../types";
import { Guild } from "../../data/entity/Guild";

export class WSGuard {
  public userId(client: Socket) {
    return deps.webSocket.sessions.userId(client) ?? "";
  }

  public validateIsUser(client: Socket, userId: string) {
    if (this.userId(client) !== userId) {
      throw new TypeError("Unauthorized");
    }
  }

  public async validateIsOwner(client: Socket, guildId: string) {
    const ownerId = this.userId(client);
    const guild = await deps.dataSource.manager.findOneBy(Guild, {
      id: guildId,
      ownerId,
    });
    if (!guild) {
      throw new TypeError("Only the guild owner can do this");
    }
  }

  public async validateCan(
    client: Socket,
    guildId: string,
    permission: PermissionTypes.PermissionString
  ) {
    const can = await this.can(permission, guildId, this.userId(client));
    if (!can)
      throw new TypeError(`Missing Permissions: ${getPermString(permission)}`);
  }

  private async can(
    permission: PermissionTypes.PermissionString,
    guildId: string,
    userId: string
  ) {
    const guild = await deps.guilds.get(guildId);
    const member = await deps.guildMembers.getInGuild(guildId, userId);

    return (
      guild.ownerId === member.userId ||
      deps.roles.hasPermission(guild, member, PermissionTypes.All[permission])
    );
  }

  public async decodeKey(token: string) {
    return { id: await deps.users.verifyToken(token) };
  }
}
