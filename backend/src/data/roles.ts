import { PermissionTypes } from "../types";
import DBWrapper from "./db-wrapper";
import { Entity } from "../types";
import { Role as RoleEntity, hasPermission } from "./entity/Role";
import { generateSnowflake } from "./snowflake-entity";

export default class Roles extends DBWrapper<string, RoleEntity> {
  public async get(id: string | undefined) {
    const role = await deps.dataSource.manager.findOneBy(RoleEntity, {
      id,
    });

    if (!role) throw new TypeError("The role doesn't exist");

    return role;
  }

  public async getEveryone(guildId: string) {
    const everyoneRole = await deps.dataSource.manager.findOneBy(RoleEntity, {
      guildId,
      name: "@everyone",
    });

    if (!everyoneRole) throw new TypeError("@everyone doesn't exist");
    return everyoneRole;
  }

  public async memberIsHigher(
    guild: Entity.Guild,
    selfMember: Entity.GuildMember,
    theirRoleIds: string[]
  ) {
    const [myRoles, theirRoles] = await Promise.all([
      deps.dataSource
        .getRepository(RoleEntity)
        .createQueryBuilder("my_roles")
        .where("my_roles.id IN (:...roles)", { roles: selfMember.roleIds })
        .getMany(),

      deps.dataSource
        .getRepository(RoleEntity)
        .createQueryBuilder("their_roles")
        .where("their_rols.id IN (:...roles", { roles: theirRoleIds })
        .getMany(),
    ]);

    const max = (key: string) => (max, val) => max[key] > val[key] ? max : val;
    const myHighestRole = myRoles.reduce(max("position"));
    const theirHighestRole = theirRoles.reduce(max("position"));

    const selfIsOwner = selfMember.userId === guild.ownerId;
    const selfHasHigherRole =
      myHighestRole.position > theirHighestRole.position;

    return selfIsOwner || selfHasHigherRole;
  }

  public async hasPermission(
    guild: Entity.Guild,
    member: Entity.GuildMember,
    permission: PermissionTypes.Permission | string
  ) {
    const guildRoles = await deps.guilds.getRoles(guild.id);
    const totalPerms = guildRoles
      .filter((r) => member.roleIds.includes(r.id))
      .reduce((acc, value) => value.permissions | acc, 0);
    const permNumber =
      typeof permission === "string"
        ? PermissionTypes.All[PermissionTypes.All[permission as string]]
        : permission;
    return hasPermission(totalPerms, +permNumber);
  }

  public async create(guildId: string, options?: Partial<Entity.Role>) {
    const roleId = generateSnowflake();
    const rolesInGuild = await deps.dataSource.manager.findBy(RoleEntity, {
      guildId,
    });
    const rolesNumber = rolesInGuild.length;

    await deps.dataSource.manager.save(RoleEntity, {
      id: roleId,
      guildId,
      mentionable: false,
      hoisted: false,
      name: "New Role",
      permissions: PermissionTypes.defaultPermissions,
      position: rolesNumber,
    });

    return await this.get(roleId);
  }
}
