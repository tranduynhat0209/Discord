import { readFileSync } from "fs";
import { Auth, UserTypes } from "../types";
import DBWrapper from "./db-wrapper";
import jwt from "jsonwebtoken";

type UserDocument = any;
type PureUserDocument = any;
type SelfUserDocument = any;
type GuildDocument = any;

export default class Users extends DBWrapper<string, UserDocument> {
  public async get(id: string | undefined): Promise<UserDocument> {}

  // TODO: TESTME
  public secure(user: UserDocument): UserDocument {
    const u = user as any;
    u.email = undefined;
    u.locked = undefined;
    u.ignored = undefined;
    u.lastReadMessageIds = undefined;
    u.verified = undefined;
    return u;
  }
  public async getPure(id: string | undefined): Promise<PureUserDocument> {}

  public async getSelf(id: string | undefined): Promise<SelfUserDocument> {}
  public async getByEmail(email: string): Promise<SelfUserDocument> {}

  public async getKnown(userId: string) {}
  public async getKnownIds(user: UserTypes.Self) {}

  public async updateById(id: string | undefined, partial: any) {}

  public async createToken(user: SelfUserDocument, expire = true) {}
  public async idFromBearerToken(auth: string | undefined): Promise<string> {
    return "";
  }
  public async verifyToken(token: string | undefined): Promise<string> {
    // too insecure to keep in memory
    const key = readFileSync("./keys/jwt", { encoding: "utf-8" });
    const decoded = jwt.verify(token as string, key, {
      algorithms: ["RS512"],
    }) as UserToken;
    return decoded?.id;
  }

  public async getUserGuilds(userId: string): Promise<GuildDocument[]> {
    return [];
  }

  public async create(
    { email, username, password }: Auth.Credentials,
    bot = false
  ): Promise<SelfUserDocument> {}

  public async getDiscriminator(username: string) {}
}

interface UserToken {
  id: string;
}
