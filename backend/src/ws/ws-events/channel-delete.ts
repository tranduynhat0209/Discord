import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WS } from "../../types";
import { WSEvent } from ".";
import { User } from "../../data/entity/User";
import { Channel } from "../../data/entity/Channel";

export default class implements WSEvent<"CHANNEL_DELETE"> {
  on = "CHANNEL_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { channelId }: WS.Params.ChannelDelete
  ) {
    if (!channelId) throw new TypeError("Not enough options were provided");

    const channel = await deps.channels.getText(channelId);
    await deps.wsGuard.validateCan(client, channel.guildId, "MANAGE_CHANNELS");

    await deps.dataSource
      .createQueryBuilder()
      .update(User)
      .where("voice = :voice", { voice: channelId })
      .set({ voice: "" })
      .execute();

    ws.io.sockets.in(channelId).socketsLeave(channelId);

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Channel)
      .where("id = :id", { id: channelId })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .update(Channel)
      .where("position > :position", { position: channel.position })
      .andWhere("guildId = :guildId", {guildId: channel.guildId})
      .set({
        position: () => "position - 1",
      })
      .execute();

    return [
      {
        emit: this.on,
        to: [],
        send: {},
      },
    ];
  }
}
