import { expect } from "chai";
import { describe, it } from "mocha";

function myFunction(a: number, b: number): number {
  return a + b;
}

describe("myModule", () => {
  describe("myFunction", () => {
    it("should return the sum of two numbers", () => {
      expect(myFunction(2, 3)).to.equal(5);
    });
  });
});
