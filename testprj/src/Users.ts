import { AppDataSource } from "./utils/data-source";
import { User } from "./entity/User";
import { Guild_Member } from "./entity/Guild-member";
import { Guild } from "./entity/Guild";

export default class Users {
  public async create(
    username: string,
    password: string,
    email: string,
    isActive: boolean,
    avatarURL: string
  ): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.isActive = isActive;
    user.avatarURL = avatarURL;

    await AppDataSource.manager.save(user);
    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await AppDataSource.manager.find(User);
    if (!users) throw new Error("No users found");
    return users;
  }

  public async get(id: number): Promise<User> {
    const user = await AppDataSource.manager.findOneBy(User, { id: id });
    if (!user) throw new Error("No user found");
    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await AppDataSource.manager.findOneBy(User, { email: email });
    if (!user) throw new Error("No user found");
    return user;
  }

  public async findUserGuilds(member_id: number): Promise<Guild[]> {
    // const guilds = await AppDataSource.getRepository(Guild_Member)
    //   .createQueryBuilder("guild_member")
    //   .leftJoinAndSelect("guild_member.guild", "guild")
    //   .where("guild_member.member_id = :member_id", { member_id: member_id })
    //   .getMany();

    const member = await AppDataSource.manager.findOneBy(User, {
      id: member_id,
    });
    if (!member) throw new Error("No member found");
    const result = await AppDataSource.manager.find(Guild_Member, {
      where: { member: { id: member_id } },
      relations: ["guild"],
    });

    return result.map((r) => r.guild);
  }

  public async updateById(id: number) {
    const user = await AppDataSource.manager.findOneBy(User, { id: id });
    if (!user) throw new Error("No user found");
    else {
      //modify here
      await AppDataSource.manager.save(user);
    }
  }

  public async deleteById(id: number) {
    const user = await AppDataSource.manager.findOneBy(User, { id: id });
    if (!user) throw new Error("No user found");
    else {
      await AppDataSource.manager.remove(user);
    }
  }

  public async getDiscriminator(username: string) {
    const count = await AppDataSource.manager.count(User, {
      where: { username: username },
    });
    const discriminator = count + 1;
    if (discriminator > 9999)
      throw new Error("Too many users have this username");

    return discriminator;
  }
}
