import { Entity } from "../types";
import { LastMessage } from "./entity/Last-message";
import { SelfUserDocument } from "./entity/User";
import { generateSnowflake } from "./snowflake-entity";

export default class Pings {
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
