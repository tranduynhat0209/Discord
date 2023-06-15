import { expect } from "chai";
import { test, describe, it } from "mocha";
import "../../src/app";
import Roles from "../../src/data/roles";
import Guilds from "../../src/data/guilds";
import GuildMembers from "../../src/data/guild-members";

describe("Roles", () => {
  before(async () => {
    if (!global.deps.dataSource.isInitialized) {
      await global.deps.dataSource.initialize();
    }
  });

  describe("get", () => {
    it("should return a role with id 1", async () => {
      const roles = new Roles();
      const role = await roles.get("role_id_1");
      expect(role).to.be.an("object");
      console.log(role);
    });
  });

  describe("get", () => {
    it("should return a role with id 2", async () => {
      const roles = new Roles();
      const role = await roles.get("role_id_2");
      expect(role).to.be.an("object");
      console.log(role);
    });
  });

  describe("getEveryone", () => {
    it("should return a role with name @everyone", async () => {
      const roles = new Roles();
      const role = await roles.getEveryone("guild_id_1");
      expect(role).to.be.an("object");
      console.log(role);
    });
  });

  describe("memberIsHigher", () => {
    it("memberIsHigher", async () => {
      const guilds = new Guilds();
      const guild = await guilds.get("guild_id_1");
      const selfMembers = new GuildMembers();
      const selfMember = await selfMembers.get("guild_member_id_1");
      const theirRoleIds = ["role_id_1", "role_id_2"];
      const roles = new Roles();
      const result = await roles.memberIsHigher(
        guild,
        selfMember,
        theirRoleIds
      );
      expect(result).to.be.not.null;
      console.log(result);
    });
  });

  describe("hasPermission", () => {
    it("hasPermission", async () => {
      const guilds = new Guilds();
      const guild = await guilds.get("guild_id_1");
      const members = new GuildMembers();
      const member = await members.get("guild_member_id_1");
      const roles = new Roles();
      const result = await roles.hasPermission(guild, member, "GENERAL");
      expect(result).to.be.not.null;
      console.log(result);
    });
  });
});
