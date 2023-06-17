import { ChannelTypes, Entity } from "../types";
import DBWrapper from "./db-wrapper";
import { Channel as ChannelEntity } from "./entity/Channel";
import { DMChannel } from "./entity/Direct-message";
import { generateSnowflake } from "./snowflake-entity";
import { sortId } from "./utils/sort-id";

export default class DMChannels extends DBWrapper<string, DMChannel> {
  public async get(id: string | undefined) {
    const channel = await deps.dataSource.manager.findOneBy(DMChannel, {
      id: id,
    });
    if (!channel) throw new TypeError("Channel not found");
    return channel;
  }

  public async getByUserIds(id0: string, id1: string) {
    const { userId0, userId1 } = sortId(id0, id1);
    const dmChannel = await deps.dataSource.manager.findOneBy(DMChannel, {
      userId0,
      userId1,
    });
    if (!dmChannel) throw new TypeError("Channel not found");
    return dmChannel;
  }

  public async getDMChannelListAndPals(userId: string) {
    const channels0 = await deps.dataSource.manager.findBy(DMChannel, {
      userId0: userId,
    });
    const channels1 = await deps.dataSource.manager.findBy(DMChannel, {
      userId1: userId,
    });
    const channels = channels0.concat(channels1);
    const pals = channels0
      .map((c) => c.userId1)
      .concat(channels1.map((c) => c.userId0));
    return { channels, pals };
  }
  public async create(options: Partial<Entity.DMChannel>) {
    const { id, userId0, userId1 } = options;

    if (!userId0 || !userId1 || userId0 === userId1)
      throw new TypeError("invalid userIds");
    try {
      const _user0 = await deps.users.get(userId0);
      const _user1 = await deps.users.get(userId1);
    } catch (err) {
      throw new TypeError("users don't exist");
    }

    console.log(options);
    const dmChannel = await deps.dataSource.manager.findOneBy(DMChannel, {
      userId0,
      userId1,
    });
    if (dmChannel) {
      throw new Error("the channel for these two users is already exist");
    }
    const newId = id ?? generateSnowflake();
    await deps.dataSource.manager.save(DMChannel, {
      id: newId,
      ...sortId(userId0, userId1),
      messageId: "",
    });

    return await this.get(newId);
  }
}
