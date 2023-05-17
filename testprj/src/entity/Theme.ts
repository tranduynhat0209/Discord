import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Theme {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({
    unique: true,
    nullable: false,
    length: 32,
  })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: "varchar",
    nullable: false,
    length: 32,
  })
  name: string;

  @ManyToOne(() => User, (creator) => creator.theme)
  creator: User;

  @Column({
    nullable: false,
    length: 255,
  })
  style: string;

  @Column()
  isFeatured: boolean;

  @Column()
  iconURL: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
