import { ChannelTypes, Entity } from "../types";
import DBWrapper from "./db-wrapper";
import { Channel as ChannelEntity } from "./entity/Channel";
import { generateSnowflake } from "./snowflake-entity";

export default class Channels extends DBWrapper<string, ChannelEntity> {
  public async get(id: string | undefined) {
    const channel = await deps.dataSource.manager.findOneBy(ChannelEntity, {
      id: id,
    });
    if (!channel)
      throw new TypeError('Channel not found');
    return channel;
  }

  public async getDM(id: string | undefined): Promise<ChannelEntity> {
    const channel = await deps.dataSource.manager.findOneBy(ChannelEntity, {
      id: id,
      type: "DM",
    });
    if (!channel)
    throw new TypeError('Channel not found');
    return channel;
  }
  public async getText(id: string | undefined): Promise<ChannelEntity> {
    const channel = await deps.dataSource.manager.findOneBy(ChannelEntity, {
      id: id,
      type: "TEXT",
    });
    if (!channel)
    throw new TypeError('Channel not found');
    return channel;
  }
  public async getVoice(id: string | undefined): Promise<ChannelEntity> {
    const channel = await deps.dataSource.manager.findOneBy(ChannelEntity, {
      id: id,
      type: "VOICE",
    });
    if (!channel)
    throw new TypeError('Channel not found');
    return channel;
  }

  public async create(options: Partial<Entity.Channel>) {
    const { guildId, name, type, id } = options;
    if (!guildId) {
      throw new Error("missing required data field");
    }
    return await deps.dataSource.manager.save(ChannelEntity, {
      id: id ?? generateSnowflake(),
      guild: { id: guildId },
      name: name ?? "chat",
      type: type ?? ChannelTypes.Type.TEXT,
    });
  }

  public async createText(guildId: string) {
    return this.create({ guildId });
  }
  public async createVoice(guildId: string) {
    return this.create({ guildId, type: ChannelTypes.Type.VOICE });
  }

  public async joinVC(channel: ChannelEntity, userId: string) {
    if (channel.type !== "VOICE") throw new Error("Channel type must be Voice");
    channel.userIds.push(userId);
    await deps.dataSource.manager.save(channel);
  }
  public async leaveVC(channel: ChannelEntity, userId: string) {
    if (channel.type !== "VOICE") throw new Error("Channel type must be Voice");
    const index = channel.userIds.indexOf(userId);
    channel.userIds.splice(index, 1);
    await deps.dataSource.manager.save(channel);
  }
}
