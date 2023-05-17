import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";
import { Role } from "./Role";
import { Invite } from "./Invite";

@Entity()
export class Guild {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    nullable: false,
    length: 32,
  })
  name: string;

  @ManyToOne(() => User, (creator) => creator.guilds)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Channel, (channel) => channel.guild)
  channels: Channel[];

  @OneToMany(() => Role, (role) => role.guild)
  roles: Role[];

  @OneToMany(() => Invite, (invite) => invite.guild)
  invites: Invite[];
}
