import { PermissionTypes } from "../types";
import DBWrapper from "./db-wrapper";
import { Entity } from "../types";

type RoleDocument = any;
export default class Roles extends DBWrapper<string, RoleDocument> {
  public async get(id: string | undefined) {}

  public async getEveryone(guildId: string) {}

  public async memberIsHigher(
    guild: Entity.Guild,
    selfMember: Entity.GuildMember,
    theirRoleIds: string[]
  ) {}

  public async hasPermission(
    guild: Entity.Guild,
    member: Entity.GuildMember,
    permission: PermissionTypes.Permission | string
  ) {}

  public async create(guildId: string, options?: Partial<Entity.Role>) {}

  public update(id: string, options: any) {}
}
