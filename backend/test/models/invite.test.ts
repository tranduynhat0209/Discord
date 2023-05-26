import { expect } from "chai";
import { describe, it } from "mocha";
import "../../src/app";
import Invites from "../../src/data/invites";

describe("invite", () => {
  before(async () => {
    if (!global.deps.dataSource.isInitialized) {
      await global.deps.dataSource.initialize();
    }
  });

  describe("getByCode", () => {
    it("should return invite with code_id_1", async () => {
      const invites = new Invites();
      const invite = await invites.get("example_invite_code_1");
      expect(invite).to.be.an("object");
      console.log(invite);
    });

    it("should return an user with code_id_2", async () => {
      const invites = new Invites();
      const invite = await invites.get("example_invite_code_2");
      expect(invite).to.be.an("object");
      console.log(invite);
    });
  });
});
