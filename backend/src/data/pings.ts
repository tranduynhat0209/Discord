import { Entity } from "../types";
import DBWrapper from "./db-wrapper";
import { LastMessage } from "./entity/Last-message";
import { SelfUserDocument } from "./entity/User";
import { generateSnowflake } from "./snowflake-entity";

export default class Pings extends DBWrapper<string, LastMessage> {
  public async get(id: string | undefined) {
    return await deps.dataSource.manager.findOneBy(LastMessage, {
      id,
    });
  }

  public async getByUser(userId: string) {
    return await deps.dataSource.manager.findBy(LastMessage, { userId });
  }
  public async getByUserAndChannel(userId: string, channelId: string) {
    return await deps.dataSource.manager.findOneBy(LastMessage, {
      userId: userId,
      channelId: channelId,
    });
  }
  public async markAsRead(user: SelfUserDocument, message: Entity.Message) {
    const lastMessage = await deps.dataSource.manager.findOneBy(LastMessage, {
      userId: user.id,
      channelId: message.channelId,
    });
    if (!lastMessage) {
      await deps.dataSource.manager.save(LastMessage, {
        id: generateSnowflake(),
        userId: user.id,
        channelId: message.channelId,
        messageId: message.id,
      });
    } else {
      lastMessage.messageId = message.id;
      await deps.dataSource.manager.save(LastMessage, lastMessage);
    }
  }
}
