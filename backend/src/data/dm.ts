import { ChannelTypes, Entity } from "../types";
import DBWrapper from "./db-wrapper";
import { DM as DMEntity } from "./entity/DM";
import { generateSnowflake } from "./snowflake-entity";

export default class DMs extends DBWrapper<string, DMEntity> {
  public async get(id: string | undefined) {
    const channel = await deps.dataSource.manager.findOneBy(DMEntity, {
      id: id,
    });
    if (!channel) throw new TypeError("DM not found");
    return channel;
  }

  public async getByUserIds(
    user0Id: string,
    user1Id: string
  ): Promise<DMEntity> {
    if (user0Id === user1Id) {
      throw new TypeError("User Ids mustn't be the same");
    }
    const id0 = user0Id < user1Id ? user0Id : user1Id;
    const id1 = user1Id < user0Id ? user1Id : user0Id;
    const dm = await deps.dataSource.manager.findOneBy(DMEntity, {
      user0Id: id0,
      user1Id: id1,
    });
    if (!dm) throw new TypeError("DM not found");
    return dm;
  }

  public async create(options: Partial<Entity.DM>) {
    const { user0Id, user1Id, id } = options;
    if (!user0Id || !user1Id) {
      throw new Error("missing required data field");
    }

    const id0 = user0Id < user1Id ? user0Id : user1Id;
    const id1 = user1Id < user0Id ? user1Id : user0Id;
    const dm = await deps.dataSource.manager.findOneBy(DMEntity, {
      user0Id: id0,
      user1Id: id1,
    });

    if (dm) {
      throw new TypeError("DM already exists");
    } else {
      const newId = id ?? generateSnowflake();
      await deps.dataSource.manager.save(DMEntity, {
        id: newId,
        user0Id: id0,
        user1Id: id1,
      });

      return await this.get(newId);
    }
  }
}
