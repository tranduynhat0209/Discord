import { AppDataSource } from "./utils/data-source";
import { Invite } from "./entity/Invite";

export default class Invites {
  public async get(code: string): Promise<Invite> {
    const invite = await AppDataSource.manager.findOneBy(Invite, {
      inviteCode: code,
    });
    if (!invite) throw new Error("No invite found");
    return invite;
  }

  public async createInvite(guildId: number, creatorId: number, code: string) {
    return await AppDataSource.manager.save(Invite, {
      inviteCode: code,
      guild: { id: guildId },
      creator: { id: creatorId },
    });
  }
}
