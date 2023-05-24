import { expect } from "chai";
import { describe, it } from "mocha";
import '../../src/app'

describe("Users", () => {
  describe("get", () => {
    it("should return an user", async () => {
      console.log(global.deps.users)
    });
  });
});
