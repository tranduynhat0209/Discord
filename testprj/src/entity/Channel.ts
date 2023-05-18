export enum CHATTYPES {
  DM = "Direct Message",
  GROUP = "Group Message",
  Voice = "Voice Message",
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { generateSnowflake } from "../utils/generate_Snowflake";
import { User } from "./User";
import { Guild } from "./Guild";
import { Message } from "./Message";

@Entity()
export class Channel {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({
    nullable: false,
    length: 32,
  })
  name: string;
  @Column({
    type: "enum",
    enum: CHATTYPES,
    default: CHATTYPES.DM,
  })
  chat_type: CHATTYPES;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (creator) => creator.channels)
  creator: User;

  @ManyToOne(() => Guild, (guild) => guild.channels)
  guild: Guild;

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.channels)
  @JoinTable()
  users: User[];
}
