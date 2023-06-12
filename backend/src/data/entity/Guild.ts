import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Guild {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: false,
    length: 128,
  })
  name: string;

  @Column({ nullable: true })
  iconURL: string;

  @Column()
  @IsNotEmpty({ message: "ownerId is required" })
  ownerId: string;

  @Column()
  systemChannelId: string;

  @CreateDateColumn()
  createdAt: Date;
}
