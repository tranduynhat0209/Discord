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
import { LastMessage } from "../entity/Last-message";
import { config } from "dotenv";
import { DMChannel } from "../entity/Direct-message";

config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    Channel,
    Guild,
    Invite,
    Message,
    Role,
    Theme,
    User,
    Guild_Member,
    LastMessage,
    DMChannel,
  ],
  migrations: [],
  subscribers: [],
});
