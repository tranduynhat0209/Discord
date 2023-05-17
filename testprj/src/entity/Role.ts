import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";
import { Guild } from "./Guild";

@Entity()
export class Role {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column({
    type: "varchar",
    length: 32,
    default: "@everyone",
  })
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

  @Column()
  position: number;

  @Column()
  permissions: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Guild, (guild) => guild.roles)
  guild: Guild;

  @ManyToOne(() => User, (creator) => creator.roles)
  creator: User;
}
