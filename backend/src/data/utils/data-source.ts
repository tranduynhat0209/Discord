import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Channel } from "../entity/Channel";
import { Guild } from "../entity/Guild";
import { Invite } from "../entity/Invite";
import { Message } from "../entity/Message";
import { Role } from "../entity/Role";
import { Guild_Member } from "../entity/Guild-member";
import { LastMessage } from "../entity/Last-message";
import { ChannelOverride } from "../entity/Channel-override";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "0xnhattranduy",
  database: process.env.DB_NAME || "discord",
  synchronize: true,
  logging: false,
  entities: [
    Channel,
    Guild,
    Invite,
    Message,
    Role,
    User,
    Guild_Member,
    LastMessage,
    ChannelOverride,
  ],
  migrations: [],
  subscribers: [],
});
