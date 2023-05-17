import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column("simple-array", { nullable: true })
  attachmentURL: string[];

  @ManyToOne(() => User, (creator) => creator.messages)
  creator: User;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  channel: Channel;

  @Column({
    nullable: false,
    length: 256,
  })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: false,
  })
  system: boolean;

  @Column()
  type: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
