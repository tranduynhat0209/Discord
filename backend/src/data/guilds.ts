import DBWrapper from "./db-wrapper";
import { Entity } from "../types";
import { Guild as GuildEntity } from "./entity/Guild";
import { Channel } from "./entity/Channel";
import { Invite } from "./entity/Invite";
import { User } from "./entity/User";
import { Role } from "./entity/Role";
import { Guild_Member } from "./entity/Guild-member";
import { generateSnowflake } from "./snowflake-entity";

export default class Guilds extends DBWrapper<string, GuildEntity> {
  public async get(id: string | undefined) {
    const guild = await deps.dataSource.manager.findOneBy(GuildEntity, {
      id: id,
    });
    if (!guild) throw new TypeError("Guild not found");
    return guild;
  }

  public async getFromChannel(id: string) {}

  public async create(options: Partial<Entity.Guild>) {
    const guildId = options.id ?? generateSnowflake();
    const [_, systemChannel, __] = await Promise.all([
      deps.roles.create(guildId, { name: "@everyone" }),
      deps.channels.createText(guildId),
      deps.channels.createVoice(guildId),
    ]);
    const [guild, ___] = await Promise.all([
      deps.dataSource.manager.save(GuildEntity, {
        _id: guildId,
        name: "Unnamed Guild",
        ownerId: options.ownerId,
        systemChannelId: systemChannel.id,
        ...options,
      }),
      deps.guildMembers.create({ guildId, userId: options.ownerId }),
    ]);

    return guild;
  }

  public async getChannels(guildId: string) {
    const channels = await deps.dataSource.manager.findBy(Channel, { guildId });
    return channels;
  }
  public async getInvites(guildId: string) {
    const invites = await deps.dataSource.manager.findBy(Invite, { guildId });
    return invites;
  }
  public async getMembers(guildId: string) {
    let members = await deps.dataSource.manager.findBy(Guild_Member, {
      guildId,
    });
    return members;
  }
  public async getRoles(guildId: string) {
    const roles = await deps.dataSource.manager.findBy(Role, { guildId });
    return roles;
  }
  public async getUsers(guildId: string) {
    // const users = await deps.dataSource
    //   .getRepository(User)
    //   .createQueryBuilder("user")
    //   .where(":guildId = ANY (user.guildIds)", { guildId })
    //   .getMany();

    const users = await deps.dataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where(`FIND_IN_SET(:guildId, user.guildIds) > 0`, { guildId })
      .getMany();

    return users;
  }

  public async getEntities(guildId: string) {
    const [channels, members, roles, users] = await Promise.all([
      this.getChannels(guildId),
      this.getMembers(guildId),
      this.getRoles(guildId),
      this.getUsers(guildId),
    ]);
    return {
      channels: channels.map((c) => c as Entity.Channel),
      members: members.map((m) => m as Entity.GuildMember),
      roles: roles.map((r) => r as Entity.Role),
      users: users
        .map((u) => deps.users.secure(u))
        .map((u) => u as any as Entity.User),
    };
  }
}
