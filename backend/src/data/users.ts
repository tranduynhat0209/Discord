import { readFile, readFileSync } from "fs";
import { Auth, UserTypes } from "../types";
import DBWrapper from "./db-wrapper";
import jwt from "jsonwebtoken";
import {
  PureUserDocument,
  SelfUserDocument,
  User as UserEntity,
} from "./entity/User";
import { Guild } from "./entity/Guild";
import { Guild_Member } from "./entity/Guild-member";

export default class Users extends DBWrapper<string, UserEntity> {
  public secure(user: UserEntity): UserEntity {
    const u = user as any;
    u.email = undefined;
    u.locked = undefined;
    u.ignored = undefined;
    u.lastReadMessageIds = undefined;
    u.verified = undefined;
    return u;
  }

  public async get(id: string | undefined) {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      id,
    });
    if (!user) throw new TypeError("User not found");
    return user;
  }
  public async getPure(id: string | undefined): Promise<PureUserDocument> {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      id,
    });
    if (!user) throw new TypeError("User not found");
    return user as any;
  }
  public async getSelf(id: string | undefined): Promise<SelfUserDocument> {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      id,
    });
    if (!user) throw new TypeError("User not found");
    return user as any as SelfUserDocument;
  }
  public async getByEmail(email: string): Promise<SelfUserDocument> {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      email,
    });
    if (!user) throw new TypeError("User not found");
    return user as any as SelfUserDocument;
  }

  public async getKnown(userId: string) {
    const user = await this.getSelf(userId);
    return await deps.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .where("user.id IN (:...userIds)", {
        userIds: await this.getKnownIds(user),
      })
      .getMany();
  }
  public async getKnownIds(user: UserTypes.Self) {
    const members = await deps.dataSource
      .getRepository(Guild_Member)
      .createQueryBuilder("guild_member")
      .where("guild_member.guildId IN (:...guildIds)", {
        guildIds: user.guildIds,
      })
      .getMany();
    const userIds = members.map((m) => m.userId);
    return Array.from(new Set([user.id, ...userIds]));
  }

  public async createToken(user: SelfUserDocument, expire = true) {
    const key = readFileSync("./keys/jwt", { encoding: "utf-8" });
    return jwt.sign({ id: user.id }, key, {
      algorithm: "RS512",
      expiresIn: expire ? "7d" : undefined,
    });
  }
  public async idFromBearerToken(auth: string | undefined): Promise<string> {
    const token = auth?.slice("Bearer ".length);
    return await this.verifyToken(token);
  }
  public async verifyToken(token: string | undefined): Promise<string> {
    // too insecure to keep in memory
    const key = readFileSync("./keys/jwt", { encoding: "utf-8" });
    const decoded = jwt.verify(token as string, key, {
      algorithms: ["RS512"],
    }) as UserToken;
    return decoded?.id;
  }

  public async getUserGuilds(userId: string): Promise<Guild[]> {
    const user = await this.getSelf(userId);
    return await deps.dataSource
      .getRepository(Guild)
      .createQueryBuilder("guild")
      .where("guild.id IN (:...guildIds)", { guildIds: user.guildIds })
      .getMany();
  }

  public async create(
    { email, username, password }: Auth.Credentials,
    bot = false
  ): Promise<SelfUserDocument> {}

  public async getDiscriminator(username: string) {
    const count = await deps.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .getCount();
    const discriminator = count + 1;
    if (discriminator > 9999)
      throw new TypeError("Too many users have this username");

    return discriminator;
  }
}

interface UserToken {
  id: string;
}
