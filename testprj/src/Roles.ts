import { AppDataSource } from "./utils/data-source";
import { Role } from "./entity/Role";
import { Guild } from "./entity/Guild";
import { FindOptionsUtils } from "typeorm";

export default class Roles {
  public async get(id: number) {
    const role = await AppDataSource.manager.findOneBy(Role, { id: id });
    if (!Role) throw new Error("No role found");
    return role;
  }

  public async getEveryOneRole(guildId: number) {
    const guild = await AppDataSource.manager.findOneBy(Guild, { id: guildId });
    if (!guild) throw new Error("No guild found");
    const role = await AppDataSource.manager.findOne(Role, {
      where: { guild: { id: guild.id }, name: "@everyone" },
      relations: ["guild"],
    });
    if (!role) throw new Error("No role found");
    return role;
  }

  public async createRole(guildId: number, name: string) {
    return await AppDataSource.manager.save(Role, {
      guild: { id: guildId },
      name: name,
      mentionable: false,
      hoisted: false,
    });
  }

  public async updateRole(guildId: number, roleId: number, name: string) {
    return await AppDataSource.manager.update(
      Role,
      {
        guild: { id: guildId },
        id: roleId,
      },
      {
        name: name,
      }
    );
  }
}
