import { Entity, MessageTypes } from "../types";
import DBWrapper from "./db-wrapper";

type MessageDocument = any;
export default class Messages extends DBWrapper<string, MessageDocument> {
  public async get(id: string | undefined) {}

  public async create(
    authorId: string,
    channelId: string,
    { attachmentURLs, content }: Partial<Entity.Message>
  ) {}

  public async createSystem(
    guildId: string,
    content: string,
    type?: MessageTypes.Type
  ) {}

  public async getChannelMessages(channelId: string) {}

  public async getDMChannelMessages(channelId: string, memberId: string) {}
}
