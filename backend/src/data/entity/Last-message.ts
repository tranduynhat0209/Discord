import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class LastMessage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  channelId: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  messageId: string;
}
