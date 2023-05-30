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
    length: 32,
  })
  name: string;

  @Column()
  iconURL?: string;

  @Column()
  @IsNotEmpty({ message: "ownerId is required" })
  ownerId: string;

  @Column()
  systemChannelId?: string;

  @CreateDateColumn()
  createdAt: Date;
}
