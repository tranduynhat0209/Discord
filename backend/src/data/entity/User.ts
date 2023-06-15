import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
} from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  Max,
  Min,
} from "class-validator";

import { Entity as EntityType, UserTypes, patterns } from "../../types";

export interface UserDocument extends EntityType.User {
  id: string;
  createdAt: never;
}
export interface SelfUserDocument extends UserTypes.Self {
  id: string;
}

@Entity()
export class Ignored {
  @Column("simple-array", {
    nullable: true,
  })
  channelIds: string[];

  @Column("simple-array", {
    nullable: true,
  })
  guildIds: string[];

  @Column("simple-array", {
    nullable: true,
  })
  userIds: string[];
}

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({
    type: "varchar",
    nullable: false,
  })
  @Length(6, 30, {
    message: "The name must be at least 6 but not longer than 30 characters",
  })
  @IsNotEmpty({ message: "The username is required" })
  @Matches(patterns.username, { message: "Invalid username format" })
  username: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  avatarURL: string;

  @Column(() => Ignored)
  ignored?: Ignored;

  @Column({ default: false })
  bot: boolean;

  @Column({
    type: "int",
    nullable: false,
    default: 0,
  })
  @Min(0, { message: "Discriminator too low" })
  @Max(9999, { message: "Discriminator too high" })
  discriminator: number;

  @Column({
    type: "bool",
    default: false,
  })
  premium: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column("simple-array", {
    nullable: true,
  })
  badges: string[];

  @Column("simple-array", {
    nullable: true,
  })
  guildIds: string[];

  @Column({ nullable: true })
  voice?: string;

  @Column({
    type: "bool",
    default: false,
  })
  verified: boolean;

  @Column({
    type: "bool",
    default: false,
  })
  locked: boolean;

  @Column({ type: "timestamp", nullable: true })
  premiumExpiration: Date;

  @Column({
    type: "varchar",
    length: 150,
    nullable: false,
  })
  @IsEmail({}, { message: "Incorrect email" })
  @IsNotEmpty({ message: "The email is required" })
  @Matches(patterns.email, { message: "Invalid email format" })
  email: string;

  @Column({
    nullable: false,
    default: "OFFLINE",
  })
  @Matches(patterns.status, { message: "Invalid status" })
  status: string;

  @Column({ nullable: true })
  salt?: string;

  @Column({ nullable: true })
  hash?: string;
}
