import DBWrapper from "./db-wrapper";
import { Entity } from "../types";

type GuildDocument = any;
export default class Guilds extends DBWrapper<string, GuildDocument> {
  public async get(id: string | undefined) {}

  public async getFromChannel(id: string) {}

  public async create(options: Partial<Entity.Guild>): Promise<GuildDocument> {}

  public async getChannels(guildId: string) {}
  public async getInvites(guildId: string) {}
  public async getMembers(guildId: string) {}
  public async getRoles(guildId: string) {}
  public async getUsers(guildId: string) {}

  public async getEntities(guildId: string) {
    const [channels, members, roles, users] = await Promise.all([
      this.getChannels(guildId),
      this.getMembers(guildId),
      this.getRoles(guildId),
      this.getUsers(guildId),
    ]);
    return { channels, members, roles, users };
  }
}
