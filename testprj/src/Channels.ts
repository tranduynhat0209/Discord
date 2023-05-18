import { AppDataSource } from "./utils/data-source";

import { Channel } from "./entity/Channel";

export default class Channels {
  public async get(id: number) {
    const channel = await AppDataSource.manager.findOneBy(Channel, { id: id });
    if (!Channel) throw new Error("No channel found");
    return channel;
  }

  public async createChannel(guildId: number, name: string, type: string) {
    return await AppDataSource.manager.save(Channel, {
      guild: { id: guildId },
      name: name,
      type: type,
    });
  }
}
