import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Matches } from "class-validator";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
    nullable: false,
    length: 32,
  })
  @Matches(/(?<!discord|accord|default)$/, {message: 'This code is reserved'})
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "varchar",
    nullable: false,
    length: 32,
  })
  name: string;

  @Column({
    nullable: false,
  })
  creatorId: string;

  @Column({
    nullable: false,
    length: 10000,
  })
  style: string;

  @Column()
  isFeatured: boolean;

  @Column()
  iconURL: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
