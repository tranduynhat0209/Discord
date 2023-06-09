import { Entity } from "../types";
import DBWrapper from "./db-wrapper";
import { Guild_Member as GuildMemberEntity } from "./entity/Guild-member";
import { Role } from "./entity/Role";
import { User } from "./entity/User";
import { generateSnowflake } from "./snowflake-entity";

export default class GuildMembers extends DBWrapper<string, GuildMemberEntity> {
  public async get(id: string | undefined) {
    const member = await deps.dataSource.manager.findOneBy(GuildMemberEntity, {
      id,
    });
    if (!member) throw new TypeError("Guild member not found");
    return member;
  }

  public async getInGuild(
    guildId: string | undefined,
    userId: string | undefined
  ) {
    const member = await deps.dataSource.manager.findOneBy(GuildMemberEntity, {
      guildId,
      userId,
    });
    if (!member) throw new TypeError("Guild member not found");
    return member;
  }

  public async create(options: Partial<Entity.GuildMember>) {
    const id = options.id ?? generateSnowflake();
    await deps.dataSource.manager.save(GuildMemberEntity, {
      id,
      roleIds: [await this.getEveryoneRoleId(options.guildId!)] || [],
      ...options,
    });
    await this.addGuildToUser(options.userId!, options.guildId!);
    return await this.get(id);
  }

  private async addGuildToUser(userId: string, guildId: string) {
    const user = await deps.users.get(userId);
    if (user.guildIds.indexOf(guildId) === -1) {
      user.guildIds.push(guildId);
      await deps.users.save(user);
    }
  }

  private async getEveryoneRoleId(guildId: string) {
    const role = await deps.dataSource.manager.findOneBy(Role, {
      guildId,
      name: "@everyone",
    });
    return role!.id;
  }
}
