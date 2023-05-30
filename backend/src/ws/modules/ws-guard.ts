import { Socket } from "socket.io";
import { PermissionTypes } from "../../types";
import { Guild } from "../../data/entity/Guild";
import { ChannelOverride } from "../../data/entity/Channel-override";

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

  public async validateCanInChannel(
    client: Socket,
    channelId: string,
    permission: PermissionTypes.PermissionString
  ) {
    const can = await this.canInChannel(
      permission,
      channelId,
      this.userId(client)
    );
    if (!can)
      throw new TypeError(
        `Missing Permissions: ${PermissionTypes.getPermString(permission)}`
      );
  }
  public async validateCan(
    client: Socket,
    guildId: string,
    permission: PermissionTypes.PermissionString
  ) {
    const can = await this.can(permission, guildId, this.userId(client));
    if (!can)
      throw new TypeError(
        `Missing Permissions: ${PermissionTypes.getPermString(permission)}`
      );
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
      deps.roles.hasPermission(
        guild,
        member,
        PermissionTypes.Permission[permission]
      )
    );
  }

  public async canInChannel(
    permission: PermissionTypes.PermissionString,
    channelId: string,
    userId: string
  ) {
    const channel = await deps.channels.get(channelId);
    const member = await deps.guildMembers.getInGuild(channel.guildId, userId);

    let cumulativeAllowPerms = 0;
    let cumulativeDenyPerms = 0;
    for (let roleId of member.roleIds) {
      const override = await deps.dataSource.manager.findOneBy(
        ChannelOverride,
        {
          channelId,
          roleId,
        }
      );

      if (override?.allow) {
        cumulativeAllowPerms |= override.allow;
      }
      if (override?.deny) {
        cumulativeDenyPerms |= override.deny;
      }
    }

    const has = (totalPerms: number, permission: number) =>
      Boolean(totalPerms & permission) ||
      Boolean(totalPerms & PermissionTypes.Permission.ADMINISTRATOR);

    const permInteger = PermissionTypes.Permission[permission] as number;
    const canInherently = await this.can(permission, channel.guildId, userId);
    const isAllowedByOverride = has(cumulativeAllowPerms, permInteger);
    const isDeniedByOverride = has(cumulativeDenyPerms, permInteger);

    return (canInherently && !isDeniedByOverride) || isAllowedByOverride;
  }

  public async decodeKey(token: string) {
    return { id: await deps.users.verifyToken(token) };
  }
}
