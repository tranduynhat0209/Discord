import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from "typeorm";
  
  import { IsNotEmpty } from "class-validator";
  @Entity()
  export class DM {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @Column({ nullable: false })
    @IsNotEmpty({ message: "user0 Id is required" })
    user0Id: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: "user1 Id is required" })
    user1Id: string;
  
    @Column()
    firstMessageId?: string;
  
    @Column()
    lastMessageId?: string;

  }
  