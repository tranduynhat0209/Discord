import { expect } from "chai";
import { describe, it } from "mocha";
import "../../src/app";
import Channels from "../../src/data/channels";

describe("Channels", () => {
  before(async () => {
    if (!global.deps.dataSource.isInitialized) {
      await global.deps.dataSource.initialize();
    }
  });

  describe("get", () => {
    it("should return a channel with id 1", async () => {
      const channels = new Channels();
      const channel = await channels.get("channel_id_1");
      expect(channel).to.be.an("object");
      console.log(channel);
    });

    it("should return a channel with id 2", async () => {
      const channels = new Channels();
      const channel = await channels.get("channel_id_2");
      expect(channel).to.be.an("object");
      console.log(channel);
    });
  });

  describe("getDM", () => {
    it("should retunn DM channels with ", async () => {
      const channels = new Channels();
      const channel = await channels.getDM("channel_id_3");
      expect(channel).to.contain({ type: "DM" });
      console.log(channel);
    });
  });

  describe("getText", () => {
    it("should return text channels with ", async () => {
      const channels = new Channels();
      const channel = await channels.getText("channel_id_1");
      expect(channel).to.contain({ type: "TEXT" });
      console.log(channel);
    });
  });

  describe("getVoice", () => {
    it("should return voice channels with ", async () => {
      const channels = new Channels();
      const channel = await channels.getVoice("channel_id_2");
      expect(channel).to.contain({ type: "VOICE" });
      console.log(channel);
    });
  });

  describe("joinVC", () => {
    it("should join the voicechat", async () => {
      const channels = new Channels();
      const channel = await channels.get("channel_id_2");
      channel.userIds = ["user_id_1"];
      await channels.joinVC(channel, "user_id_2");
      expect(channel.userIds).to.deep.equal(["user_id_1", "user_id_2"]);
    });
  });

  describe("leaveVC", () => {
    it("should leave the voicechat", async () => {
      const channels = new Channels();
      const channel = await channels.get("channel_id_2");
      channel.userIds = ["user_id_1", "user_id_2", "user_id_3"];
      await channels.leaveVC(channel, "user_id_3");
      expect(channel.userIds).to.deep.equal(["user_id_1", "user_id_2"]);
    });
  });
});
