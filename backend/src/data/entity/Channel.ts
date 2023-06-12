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
    length: 128,
  })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
  })
  // @IsNotEmpty({ message: "creatorId is required" })
  creatorId: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: "guildId is required" })
  guildId: string;

  @Column({ type: "boolean", default: false })
  filterProfanity: boolean;

  @Column({ nullable: true })
  firstMessageId: string;

  @Column({ nullable: true })
  lastMessageId: string;

  @Column({
    length: 128,
    nullable: true,
  })
  summary: string;

  @Column({ default: 0 })
  @Min(0, { message: "Position must be greater than 0" })
  position: number;

  @Column("simple-array", {
    // default: [],
    nullable: true,
  })
  userIds: string[];

  @Column({ default: "TEXT" })
  @Matches(/^TEXT$|^VOICE$|^DM$/, { message: "Invalid type" })
  type: string;
}
