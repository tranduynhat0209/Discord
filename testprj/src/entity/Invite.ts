import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import generateInvite from "../utils/generate_invite";
import { generateSnowflake } from "../utils/generate_Snowflake";
import { User } from "./User";
import { Guild } from "./Guild";

@Entity()
export class Invite {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    nullable: false,
    length: 32,
  })
  inviteCode: string;

  @ManyToOne(() => User, (creator) => creator.invites)
  creator: User;

  @ManyToOne(() => Guild, (guild) => guild.invites)
  guild: Guild;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  expiresAt: Date;
}
