import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Guild } from "./Guild";
import { Channel } from "./Channel";
import { Role } from "./Role";
import { Message } from "./Message";
import { Invite } from "./Invite";
import { Theme } from "./Theme";

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  username: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  email: string;

  @Column({
    type: "boolean",
    nullable: false,
    default: false,
  })
  isActive: boolean;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  avatarURL: string;

  @Column({ default: false })
  isBot: boolean;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  discriminator: number;

  @OneToMany(() => Guild, (guild) => guild.creator)
  guilds: Guild[];

  @OneToMany(() => Channel, (channel) => channel.creator)
  channels: Channel[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];

  @OneToMany(() => Role, (role) => role.creator)
  roles: Role[];

  @OneToMany(() => Invite, (invite) => invite.creator)
  invites: Invite[];

  @OneToMany(() => Theme, (theme) => theme.creator)
  theme: Theme[];
}
