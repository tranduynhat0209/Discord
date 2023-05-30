import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class MessageEmbed {
  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageURL: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  url: string;
}
@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("simple-array")
  attachmentURL?: string[];

  @Column({ nullable: false })
  authorId: string;

  @Column({ nullable: false })
  channelId: string;

  @Column({
    nullable: false,
    length: 3000,
  })
  @IsNotEmpty({ message: "content can't be empty" })
  content?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: false,
  })
  system: boolean;

  @Column({ nullable: true })
  type?: string;

  @Column(() => MessageEmbed)
  embed?: MessageEmbed;

  @UpdateDateColumn()
  updatedAt: Date;
}
