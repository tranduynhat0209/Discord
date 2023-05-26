import { expect } from "chai";
import { describe, it } from "mocha";
import "../../src/app";
import Users from "../../src/data/users";

describe("Users", () => {
  before(async () => {
    if (!global.deps.dataSource.isInitialized) {
      await global.deps.dataSource.initialize();
    }
  });

  describe("get", () => {
    it("should return an user with id 1", async () => {
      const users = new Users();
      const user = await users.get("user_id_1");
      expect(user).to.be.an("object");
      console.log(user);
    });

    it("should return an user with id 3", async () => {
      const users = new Users();
      const user = await users.get("user_id_3");
      expect(user).to.be.an("object");
      console.log(user);
    });
  });

  describe("getSelf", () => {
    it("should return an user with id 1", async () => {
      const users = new Users();
      const user = await users.getSelf("user_id_1");
      expect(user).to.be.an("object");
      console.log(user);
    });

    it("should return an user with id 3", async () => {
      const users = new Users();
      const user = await users.getSelf("user_id_3");
      expect(user).to.be.an("object");
      console.log(user);
    });
  });

  describe("getPure", () => {
    it("should return an user with id 1", async () => {
      const users = new Users();
      const user = await users.getPure("user_id_1");
      expect(user).to.be.an("object");
      console.log(user);
    });

    it("should return an user with id 3", async () => {
      const users = new Users();
      const user = await users.getPure("user_id_3");
      expect(user).to.be.an("object");
      console.log(user);
    });
  });

  describe("getByEmail", () => {
    it("should return an user with email 1", async () => {
      const users = new Users();
      const user = await users.getByEmail("johndoe@example.com");
      expect(user).to.be.an("object");
      console.log(user);
    });

    it("should return an user with email 4", async () => {
      const users = new Users();
      const user = await users.getByEmail("sarahlee@example.com");
      expect(user).to.be.an("object");
      console.log(user);
    });
  });

  describe("getKnownIds", () => {
    it("should return an array of ids_user_1", async () => {
      const users = new Users();
      const user = await users.getSelf("user_id_1");
      const ids = await users.getKnownIds(user);
      expect(ids).to.be.an("array");
      console.log(ids);
    });

    it("should return an array of ids_user_2", async () => {
      const users = new Users();
      const user = await users.getSelf("user_id_2");
      const ids = await users.getKnownIds(user);
      expect(ids).to.be.an("array");
      console.log(ids);
    });
  });

  describe("getKnown", () => {
    it("should return an array of users_user_1", async () => {
      const users = new Users();
      const knowusers = await users.getKnown("user_id_1");
      expect(knowusers).to.be.an("array");
      console.log(knowusers);
    });

    it("should return an array of users_user_2", async () => {
      const users = new Users();
      const knowusers = await users.getKnown("user_id_2");
      expect(knowusers).to.be.an("array");
      console.log(knowusers);
    });
  });

  describe("getUserGuilds", () => {
    it("should return an array of guilds_user_1", async () => {
      const users = new Users();
      const guilds = await users.getUserGuilds("user_id_1");
      expect(guilds).to.be.an("array");
      console.log(guilds);
    });

    it("should return an array of guilds_user_2", async () => {
      const users = new Users();
      const guilds = await users.getUserGuilds("user_id_2");
      expect(guilds).to.be.an("array");
      console.log(guilds);
    });
  });

  describe("getDiscriminator", () => {
    it("should return discriminator of user_id_1", async () => {
      const users = new Users();
      const discrim = await users.getDiscriminator("1");
      expect(discrim).to.be.an("number");
      console.log(discrim);
    });

    it("sshould return discriminator of user_id_1", async () => {
      const users = new Users();
      const discrim = await users.getDiscriminator("2");
      expect(discrim).to.be.an("number");
      console.log(discrim);
    });
  });
});
