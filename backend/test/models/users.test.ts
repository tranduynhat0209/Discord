import { expect } from "chai";
import { describe, it } from "mocha";
import Users from "../../src/data/users";

describe("Users", () => {
  describe("get", () => {
    it("should return a user", async () => {
      const users = new Users();
      const user = await users.get("1");
      expect(user).to.not.be.undefined;
    });
  });
});
