import { expect } from "chai";
import { describe, it } from "mocha";
import "../../src/app";
import GuildMembers from "../../src/data/guild-members";
import Users from "../../src/data/users";
import Roles from "../../src/data/roles";

describe("GuildMember", () => {
  before(async () => {
    if (!global.deps.dataSource.isInitialized) {
      await global.deps.dataSource.initialize();
    }
  });

  describe("get", () => {
    it("should return an member with guild_member_id 1", async () => {
      const users = new GuildMembers();
      const user = await users.get("guild_member_id_1");
      expect(user).to.be.an("object");
      console.log(user);
    });

    it("should return an user with guild_member_id 3", async () => {
      const users = new GuildMembers();
      const user = await users.get("guild_member_id_3");
      expect(user).to.be.an("object");
      console.log(user);
    });
  });

  describe("getInGuild", () => {
    it("should return an member with guild_member_id 1 and guild_id 1", async () => {
      const users = new GuildMembers();
      const user = await users.getInGuild("guild_id_1", "user_id_1");
      expect(user).to.be.an("object");
      console.log(user);
    });
  });

  //change private -> public

  // describe("addGuildToUser", () => {
  //   it("should add user to guild", async () => {
  //     const users = new Users();
  //     const user = await users.get("user_id_2");
  //     user.guildIds.shift();
  //     const gmember = new GuildMembers();
  //     await gmember.addGuildToUser("user_id_2", "guild_id_1");
  //   });
  // });

  // describe("getEveryoneRoleId", () => {
  //   it("should return roleeveryone", async () => {
  //     const roles = new Roles();
  //     const gmember = new GuildMembers();
  //     const roleid = await gmember.getEveryoneRoleId("guild_id_1");
  //     expect(roleid).to.be.an("string");
  //     console.log(roleid);
  //   });
  // });
});
