import { AppDataSource } from "./utils/data-source";
import { Message } from "./entity/Message";
import { User } from "./entity/User";
import { Channel } from "./entity/Channel";

export default class Messages {
  public async get(id: number) {
    const message = await AppDataSource.manager.findOneBy(Message, { id: id });
    if (!Message) throw new Error("No message found");
    return message;
  }

  public async createMessage(
    creatorId: number,
    channelId: number,
    content: string,
    attachmentURL: string
  ) {
    if (!content && !attachmentURL?.length)
      throw new Error("No content or attachmentURL");

    const message = new Message();
    const user = await AppDataSource.manager.findOneBy(User, { id: creatorId });
    if (!user) throw new Error("No user found");
    const channel = await AppDataSource.manager.findOneBy(Channel, {
      id: channelId,
    });
    if (!channel) throw new Error("No channel found");
    message.creator = user;
    message.channel = channel;
    message.content = content;
    message.attachmentURL = [attachmentURL];
    message.type = "text";
    message.system = false;
    return await AppDataSource.manager.save(message);
  }

  public async updateById(id: number) {
    const message = await AppDataSource.manager.findOneBy(Message, { id: id });
    if (!message) throw new Error("No message found");
    else {
      //modify here
      return await AppDataSource.manager.save(message);
    }
  }

  public async createSystemMessage() {}

  public async getChannelMessages(channelId: number) {
    const messages = await AppDataSource.manager.find(Message, {
      where: { channel: { id: channelId } },
    });
    if (!messages) throw new Error("No messages found");
    return messages;
  }

  public async getDMMessages(userId: number) {}
}
