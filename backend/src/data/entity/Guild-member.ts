import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
} from "typeorm";

@Entity()
export class Guild_Member {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  guildId: string;

  @Column({ nullable: false })
  userId: string;

  @Column("simple-array")
  roleIds: string[];

  @CreateDateColumn()
  createdAt: Date;

  @AfterInsert()
  @AfterLoad()
  @AfterUpdate()
  async checkNull() {
    if (this.roleIds == null) {
      this.roleIds = [];
    }
  }
}
