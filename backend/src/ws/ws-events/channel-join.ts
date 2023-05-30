import { WebSocket } from "../websocket";
import { Socket } from "socket.io";
import { WS } from "../../types";
import { WSEvent } from ".";
import { SelfUserDocument, User } from "../../data/entity/User";

export default class implements WSEvent<"CHANNEL_JOIN"> {
  on = "CHANNEL_JOIN" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { channelId }: WS.Params.ChannelJoin
  ) {
    const channel = await deps.channels.get(channelId);
    if (channel.type !== "VOICE")
      throw new TypeError("You cannot join a non-voice channel");

    await deps.wsGuard.validateCanInChannel(client, channelId, "CONNECT");

    const userId = ws.sessions.get(client.id);
    const user = await deps.users.getSelf(userId);
    const movedChannel = user.voice !== channelId;

    if (user.voice && movedChannel) await deps.channelLeave.invoke(ws, client);

    const doesExist = channel.userIds.includes(userId);
    if (doesExist) throw new TypeError("User already connected to voice");

    deps.voiceService.add(channelId, { userId });

    await Promise.all([
      client.join(channelId),
      deps.channels.joinVC(channel, userId),
      this.updateVoiceState(user, channelId),
    ]);

    return [
      {
        emit: "CHANNEL_UPDATE" as const,
        to: [channel.guildId],
        send: {
          channelId: channel.id,
          partialChannel: { userIds: channel.userIds },
        } as WS.Args.ChannelUpdate,
      },
      {
        emit: "VOICE_STATE_UPDATE" as const,
        to: [channel.id],
        send: {
          userId: user.id,
          voice: channelId,
        } as WS.Args.VoiceStateUpdate,
      },
    ];
  }

  private async updateVoiceState(user: SelfUserDocument, channelId: string) {
    await deps.dataSource
      .createQueryBuilder()
      .update(User)
      .where("id = :id", { id: user.id })
      .set({ voice: channelId })
      .execute();
  }
}
