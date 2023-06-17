import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class DMChannel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  userId0: string;

  @Column({ nullable: false })
  userId1: string;

  @Column({ nullable: false })
  messageId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  firstMessageId: string;

  @Column({ nullable: true })
  lastMessageId: string;
}
