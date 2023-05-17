import { AppDataSource } from "./utils/data-source";
import { Guild_Member } from "./entity/Guild-member";
import { User } from "./entity/User";
import { Guild } from "./entity/Guild";

export default class Guild_members {
  public async get(memberid: number): Promise<User[]> {
    const user = await AppDataSource.manager.findOneBy(User, { id: memberid });
    if (!user) throw new Error("No member found");
    const member_res = await AppDataSource.manager.find(Guild_Member, {
      where: { member: { id: user.id } },
      relations: ["Guild"],
    });
    if (!member_res) throw new Error("No member found");
    return member_res.map((r) => r.member);
  }

  public async getInGuild(userId: number, guildId: number) {}

  public async create(userId: number, guildId: number) {
    const res = new Guild_Member();
    res.member = await AppDataSource.manager.findOneBy(User, {
      id: userId,
    });
    res.guild = await AppDataSource.manager.findOneBy(Guild, {
      id: guildId,
    });
    await AppDataSource.manager.save(res);
    return res;
  }

  private async addGuildtoUser(userId: number, guildId: number) {}

  private async getEveryOneRoleID(guildId: number) {}

  public async update(userId: number, guildId: number) {}
}
