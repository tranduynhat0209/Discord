import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

import { IsNotEmpty, Matches, Min } from "class-validator";
import { PermissionTypes, patterns } from "../../types";

export function hasPermission(current: number, required: number) {
  return (
    Boolean(current & required) ||
    Boolean(current & PermissionTypes.Permission.ADMINISTRATOR)
  );
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 32,
    default: "@everyone",
  })
  @Matches(patterns.roleName, { message: "Invalid role name format" })
  name: string;

  @Column({
    type: "varchar",
    length: 7,
    default: "#FFFFFF",
  })
  color: string;

  @Column()
  hoisted: boolean;

  @Column()
  mentionable: boolean;

  @Column({ nullable: false })
  @Min(0, { message: "Position must be 0 or greater" })
  position: number;

  @Column({ nullable: false })
  permissions: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @IsNotEmpty({ message: "guildId is required" })
  guildId: string;
}
