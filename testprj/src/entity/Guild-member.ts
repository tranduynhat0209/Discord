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
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { Guild } from "./Guild";
import { Role } from "./Role";

@Entity()
export class Guild_Member {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({
    name: "member_id",
  })
  member: User;

  @OneToOne(() => Guild)
  @JoinColumn()
  guild: Guild;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role;
}
