import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Entity, WS } from "../../types";
import { Channel } from "../../data/entity/Channel";

export default class implements WSEvent<"CHANNEL_UPDATE"> {
  public on = "CHANNEL_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { position, name, summary, channelId }: WS.Params.ChannelUpdate
  ) {
    const channel = await deps.channels.get(channelId);
    await deps.wsGuard.validateCan(client, channel.guildId, "MANAGE_CHANNELS");

    if (position) {
      await this.raiseHigherChannels(position, channel);
    }

    if (name) channel.name = name;
    if (summary) channel.summary = summary;
    if (position) channel.position = position;

    await deps.channels.save(channel);

    return [
      {
        emit: this.on,
        to: [channel.guildId],
        send: {
          channelId: channel.id,
          partialChannel: { position, name, summary },
        } as WS.Args.ChannelUpdate,
      },
    ];
  }

  private async raiseHigherChannels(position: number, channel: Channel) {
    await deps.dataSource
      .createQueryBuilder()
      .update(Channel)
      .where("position > :position", { position: position })
      .andWhere("guildId = :guildId", { guildId: channel.guildId })
      .set({
        position: () => "position + 1",
      })
      .execute();
  }
}
