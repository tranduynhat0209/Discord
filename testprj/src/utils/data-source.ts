import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Channel } from "../entity/Channel";
import { Guild } from "../entity/Guild";
import { Invite } from "../entity/Invite";
import { Message } from "../entity/Message";
import { Role } from "../entity/Role";
import { Theme } from "../entity/Theme";
import { Guild_Member } from "../entity/Guild-member";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "newuser",
  password: "123456",
  database: "app_db",
  synchronize: true,
  logging: false,
  entities: [Channel, Guild, Invite, Message, Role, Theme, User, Guild_Member],
  migrations: [],
  subscribers: [],
});
