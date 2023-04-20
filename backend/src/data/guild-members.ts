import { Entity } from "../types";
import DBWrapper from "./db-wrapper";

type GuildMemberDocument = any;
export default class GuildMembers extends DBWrapper<
  string,
  GuildMemberDocument
> {
  public async get(id: string | undefined) {}

  public async getInGuild(
    guildId: string | undefined,
    userId: string | undefined
  ) {}

  public async create(options: Partial<Entity.GuildMember>) {}

  private async addGuildToUser(userId: string, guildId: string) {}

  private async getEveryoneRoleId(guildId: string) {}

  public async update(memberId: string, options: any) {}
}
