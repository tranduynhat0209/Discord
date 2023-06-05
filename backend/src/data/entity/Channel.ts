import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { IsNotEmpty, Matches, Min } from "class-validator";
@Entity()
export class Channel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    length: 32,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @IsNotEmpty({ message: "creatorId is required" })
  creatorId: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "guildId is required" })
  guildId: string;

  @Column({ type: "boolean" })
  filterProfanity: boolean;

  @Column()
  firstMessageId: string;

  @Column()
  lastMessageId: string;

  @Column({
    length: 128,
  })
  summary: string;

  @Column()
  @Min(0, { message: "Position must be greater than 0" })
  position: number;

  @Column("simple-array", {
    // default: [],
  })
  userIds: string[];

  @Column({ default: "TEXT" })
  @Matches(/^TEXT$|^VOICE$|^DM$/, { message: "Invalid type" })
  type: string;
}
