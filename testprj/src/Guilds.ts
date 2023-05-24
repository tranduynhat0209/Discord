import { Guild } from "./entity/Guild";
import { AppDataSource } from "./utils/data-source";
import { User } from "./entity/User";

export default class Guilds {
  public async get(id: number): Promise<Guild> {
    const guild = await AppDataSource.manager.findOneBy(Guild, { id: id });
    if (!guild) throw new Error("No guild found");
    return guild;
  }

  public async create(name: string, owner_id: number): Promise<Guild> {
    const guild = new Guild();
    guild.name = name;
    guild.creator = await AppDataSource.manager.findOneBy(User, {
      id: owner_id,
    });
    await AppDataSource.manager.save(guild);
    return guild;
  }
}
