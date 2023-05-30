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
import { User } from "./User";
import { Guild } from "./Guild";
import { Max, Min } from "class-validator";

@Entity()
export class InviteOptions {
  @Column({ type: "timestamp", nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  @Min(1)
  @Max(1000)
  maxUses: number;
}

@Entity()
export class Invite {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    length: 32,
  })
  inviteCode: string;

  @Column({ nullable: false })
  inviterId: string;

  @Column({ nullable: false })
  guildId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  uses: number;

  @Column(() => InviteOptions)
  options?: InviteOptions;
}
