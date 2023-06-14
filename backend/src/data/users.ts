import { readFile, readFileSync } from "fs";
import { Auth, UserTypes, patterns } from "../types";
import DBWrapper from "./db-wrapper";
import jwt from "jsonwebtoken";
import { SelfUserDocument, User, User as UserEntity } from "./entity/User";
import { Guild } from "./entity/Guild";
import { Guild_Member } from "./entity/Guild-member";
import { generateSnowflake } from "./snowflake-entity";
import { APIError } from "../rest/modules/api-error";
import {
  comparePassword,
  generateSalt,
  hashPassword,
  isPasswordValid,
} from "./utils/password";
import { VerifyFunction } from "passport-local";
import { Request } from "express";

export default class Users extends DBWrapper<string, UserEntity> {
  public secure(user: UserEntity): UserEntity {
    const u = user as any;
    u.email = undefined;
    u.locked = undefined;
    u.ignored = undefined;
    u.verified = undefined;
    return u;
  }

  public async get(id: string | undefined) {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      id,
    });
    if (!user) throw new APIError(404, "User Not Found");

    return this.secure(user);
  }
  public async exportUserSelf(user: UserEntity): Promise<SelfUserDocument> {
    const lastMessages = await deps.pings.getByUser(user.id);
    const lastReadMessageIds = {};
    for (let message of lastMessages) {
      lastReadMessageIds[message.channelId] = message.messageId;
    }
    const self = {
      ...user,
      lastReadMessageIds,
      badges: user.badges.map((badge) => badge as UserTypes.Badge),
      status: user.status as UserTypes.StatusType,
    };
    return self;
  }

  public async getSelf(id: string | undefined): Promise<SelfUserDocument> {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      id,
    });
    if (!user) throw new APIError(404, "User Not Found");
    return await this.exportUserSelf(user);
  }
  public async getByEmail(email: string) {
    const user = await deps.dataSource.manager.findOneBy(UserEntity, {
      email,
    });
    if (!user) throw new APIError(404, "User Not Found");
    return user;
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

  // dev-mode only (insecure)
  public async createToken(user: SelfUserDocument | UserEntity, expire = true) {
    const key = readFileSync("./keys/jwtRS512.key", { encoding: "utf-8" });
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
    const key = readFileSync("./keys/jwtRS512.key", { encoding: "utf-8" });
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
  ): Promise<SelfUserDocument> {
    if (!email) throw new TypeError("email is required");
    if (!username) throw new TypeError("username is required");
    if (!password) throw new TypeError("password is required");
    if (!RegExp(patterns.email).test(email)) {
      throw new TypeError("email is invalid");
    }
    try {
      const userHasExistEmail = await deps.users.getByEmail(email);
      console.log(userHasExistEmail);
      if (userHasExistEmail) throw new TypeError("email is already in use");
    } catch (error) {
      if (error instanceof APIError && error.message === "User Not Found") {
        // ok
      } else throw error;
    }
    const id = generateSnowflake();
    const salt = await generateSalt();
    const hash = await hashPassword(password, salt);
    const badges: string[] = [];
    const guildIds: string[] = [];
    const ignored = {
      userIds: [],
      channelIds: [],
      guildIds: [],
    };
    const newUser = {
      id,
      username,
      email,
      avatarURL: `/avatars/avatar_grey.png`,
      bot,
      discriminator: await this.getDiscriminator(username),
      salt,
      hash,
      badges,
      guildIds,
      ignored,
    };

    console.log(newUser);
    await deps.dataSource.manager.save(User, newUser);
    return await this.getSelf(id);
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    if (!isPasswordValid(newPassword)) {
      throw new TypeError("the format of the new password is invalid");
    }
    const user = await this.get(userId);
    if (!user.hash) throw new TypeError("old password doesn't exist");

    const isOldValid = await comparePassword(newPassword, user.hash);
    if (!isOldValid) {
      throw new TypeError("old password is incorrect");
    }

    if (oldPassword === newPassword) {
      throw new TypeError("new password must be different with the old one");
    }

    const salt = await generateSalt();
    const hash = await hashPassword(newPassword, salt);
    user.hash = hash;
    user.salt = salt;
    await this.save(user);
  }

  public async setPassword(userId: string, newPassword: string) {
    if (!isPasswordValid(newPassword)) {
      throw new TypeError("the format of the new password is invalid");
    }
    const user = await this.get(userId);

    const salt = await generateSalt();
    const hash = await hashPassword(newPassword, salt);
    user.hash = hash;
    user.salt = salt;
    await this.save(user);
  }

  public authenticate: VerifyFunction = async (email, password, callback) => {
    const user = await this.getByEmail(email);
    if (!user) {
      return callback(new TypeError("user not found"));
    }
    if (!user.hash) {
      return callback(new TypeError("user's password hasn't been set"));
    }
    const isValid = comparePassword(password, user.hash);
    if (!isValid) {
      return callback(new TypeError("user's password is incorrect"));
    }
    return callback(null, user);
  };

  // public serializeUser() {
  //   return (
  //     user: SelfUserDocument,
  //     callback: (err: null | TypeError, id?: string) => void
  //   ) => {
  //     process.nextTick(function () {
  //       callback(null, user.id);
  //     });
  //   };
  // }

  public serializeUser() {
    (user: SelfUserDocument, done) => {
      done(null, user.id);
    };
  }

  public deserializeUser() {
    (id: string, done) => {
      this.getSelf(id)
        .then((user) => {
          done(null, user);
        })
        .catch((err) => {
          done(err, null);
        });
    };
  }

  // public async deserializeUser() {
  //   return async (
  //     id: string,
  //     callback: (err: null | TypeError, user?: SelfUserDocument) => void
  //   ) => {
  //     try {
  //       const user = await this.getSelf(id);
  //       return callback(null, user);
  //     } catch (err) {
  //       return callback(err as TypeError);
  //     }
  //   };
  // }

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
