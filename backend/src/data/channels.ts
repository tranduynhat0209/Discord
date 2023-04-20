import { Entity } from "../types";
import DBWrapper from "./db-wrapper";

type ChannelDocument = any;
export default class Channels extends DBWrapper<string, ChannelDocument> {
  public async get(id: string | undefined) {}

  public async getDM(id: string | undefined) {}
  public async getText(id: string | undefined) {}
  public async getVoice(id: string | undefined) {}

  public async create(
    options: Partial<Entity.Channel>
  ): Promise<ChannelDocument> {}

  public async createText(guildId: string) {}
  public async createVoice(guildId: string) {}

  public async joinVC(channel: any, userId: string) {}
  public async leaveVC(channel: any, userId: string) {}

  public async getSystem(guildId: string) {}
}
