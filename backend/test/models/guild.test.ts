import { expect } from "chai";
import { describe, it } from "mocha";
import "../../src/app";
import Guilds from "../../src/data/guilds";

describe("Guilds", () => {
  before(async () => {
    if (!global.deps.dataSource.isInitialized) {
      await global.deps.dataSource.initialize();
    }
  });

  describe("get", () => {
    it("should return a guild with id 1", async () => {
      const guilds = new Guilds();
      const guild = await guilds.get("guild_id_1");
      expect(guild).to.be.an("object");
      console.log(guild);
    });

    it("should return a guild with id 2", async () => {
      const guilds = new Guilds();
      const guild = await guilds.get("guild_id_2");
      expect(guild).to.be.an("object");
      console.log(guild);
    });
  });

  describe("getChannels", () => {
    it("should return all channels of guild with id 1", async () => {
      const guilds = new Guilds();
      const channels = await guilds.getChannels("guild_id_1");
      expect(channels).to.be.an("array");
      console.log(channels);
    });

    it("should return all channels of guild with id 2", async () => {
      const guilds = new Guilds();
      const channels = await guilds.getChannels("guild_id_2");
      expect(channels).to.be.an("array");
      console.log(channels);
    });
  });

  describe("getInvites", () => {
    it("should return all invites of guild with id 1", async () => {
      const guilds = new Guilds();
      const invites = await guilds.getInvites("guild_id_1");
      expect(invites).to.be.an("array");
      console.log(invites);
    });

    it("should return all invites of guild with id 2", async () => {
      const guilds = new Guilds();
      const invites = await guilds.getInvites("guild_id_2");
      expect(invites).to.be.an("array");
      console.log(invites);
    });
  });

  describe("getMembers", () => {
    it("should return all members of guild with id 1", async () => {
      const guilds = new Guilds();
      const members = await guilds.getMembers("guild_id_1");
      expect(members).to.be.an("array");
      console.log(members);
    });

    it("should return all members of guild with id 2", async () => {
      const guilds = new Guilds();
      const members = await guilds.getMembers("guild_id_2");
      expect(members).to.be.an("array");
      console.log(members);
    });
  });

  describe("getRoles", () => {
    it("should return all roles of guild with id 1", async () => {
      const guilds = new Guilds();
      const roles = await guilds.getRoles("guild_id_1");
      expect(roles).to.be.an("array");
      console.log(roles);
    });

    it("should return all roles of guild with id 2", async () => {
      const guilds = new Guilds();
      const roles = await guilds.getRoles("guild_id_2");
      expect(roles).to.be.an("array");
      console.log(roles);
    });
  });

  describe("getUsers", () => {
    it("should return all users of guild with id 1", async () => {
      const guilds = new Guilds();
      const users = await guilds.getUsers("guild_id_1");
      expect(users).to.be.an("array");
      console.log(users);
    });

    it("should return all users of guild with id 2", async () => {
      const guilds = new Guilds();
      const users = await guilds.getUsers("guild_id_2");
      expect(users).to.be.an("array");
      console.log(users);
    });
  });

  describe("getEntities", () => {
    it("should return all entities of guild with id 1", async () => {
      const guilds = new Guilds();
      const entities = await guilds.getEntities("guild_id_1");
      expect(entities).to.be.an("object");
      console.log(entities);
    });

    it("should return all entities of guild with id 2", async () => {
      const guilds = new Guilds();
      const entities = await guilds.getEntities("guild_id_2");
      expect(entities).to.be.an("object");
      console.log(entities);
    });
  });
});
