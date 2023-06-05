import { Entity, MessageTypes } from "../types";
import DBWrapper from "./db-wrapper";
import { Message as MessageEntity } from "./entity/Message";
import { generateSnowflake } from "./snowflake-entity";

export default class Messages extends DBWrapper<string, MessageEntity> {
  public async get(id: string | undefined) {
    const message = await deps.dataSource.manager.findOneBy(MessageEntity, {
      id,
    });
    if (!message) throw new TypeError("Message doesn't exist");
    return message;
  }


  public async create(
    authorId: string,
    channelId: string,
    { attachmentURLs, content }: Partial<Entity.Message>
  ) {
    if (!content && !attachmentURLs?.length)
      throw new TypeError("Empty messages are not valid");

    const id = generateSnowflake();
    await deps.dataSource.manager.save(MessageEntity, {
      id,
      attachmentURLs,
      authorId,
      channelId,
      content,
    });

    return await this.get(id);
  }

  public async createSystem(
    guildId: string,
    content: string,
    type?: MessageTypes.Type
  ) {
    const guild = await deps.guilds.get(guildId);
    if (!guild) {
      throw new TypeError("Guild not found");
    }
    if (!guild.systemChannelId)
      throw new TypeError("No system channel configured");

    return await deps.dataSource.manager.save(MessageEntity, {
      id: generateSnowflake(),
      type,
      channelId: guild.systemChannelId,
      content,
      system: true,
    });
  }

  public async getChannelMessages(channelId: string) {
    return await deps.dataSource.manager.findBy(MessageEntity, { channelId });
  }

  public async getDMChannelMessages(channelId: string, memberId: string) {
    const channel = await deps.channels.get(channelId);
    if (!channel) return new TypeError("Channel doesn't exist");

    if (channel.userIds.indexOf(memberId) !== -1)
      throw new TypeError("You cannot access this channel");
    return await this.getChannelMessages(channelId);
  }
}
