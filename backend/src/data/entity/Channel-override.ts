import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChannelOverride {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  channelId: string;

  @Column({ nullable: false })
  roleId: string;

  @Column()
  allow?: number;

  @Column()
  deny?: number;
}
