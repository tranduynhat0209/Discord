import { WSEvent } from ".";
import { Channel } from "../../data/entity/Channel";
import { SelfUserDocument, User } from "../../data/entity/User";
import { WS } from "../../types";
import { WebSocket } from "../websocket";
import { Socket } from "socket.io";

export default class implements WSEvent<"CHANNEL_LEAVE"> {
  public on = "CHANNEL_LEAVE" as const;

  public async invoke(ws: WebSocket, client: Socket) {
    console.log("Leaving channel");
    const userId = ws.sessions.get(client.id);
    const user = await deps.users.getSelf(userId);

    const oldChannel = await deps.channels.getSafely(user.voice);
    if (!oldChannel) return [];

    await this.updateVoiceState(user);

    var channelLeaveAction = await this.handleExistingVC(
      oldChannel,
      userId,
      ws,
      client
    );
    return [
      channelLeaveAction,
      {
        emit: "VOICE_STATE_UPDATE" as const,
        to: [client.id],
        send: {
          userId: user.id,
          voice: "",
        } as WS.Args.VoiceStateUpdate,
      },
    ];
  }

  private async handleExistingVC(
    oldChannel: Channel,
    userId: string,
    ws: WebSocket,
    client
  ) {
    if (oldChannel.type !== "VOICE")
      throw new TypeError("You cannot leave a non-voice channel");

    const doesExist = oldChannel.userIds.includes(userId);
    if (!doesExist) throw new TypeError("User not connected to voice");

    // leave voice server
    deps.voiceService.remove(oldChannel.id, userId);

    await Promise.all([
      client.leave(oldChannel.id),
      deps.channels.leaveVC(oldChannel, userId),
    ]);

    return {
      emit: "CHANNEL_UPDATE" as const,
      to: [oldChannel.guildId],
      send: {
        channelId: oldChannel.id,
        partialChannel: { userIds: oldChannel.userIds },
      } as WS.Args.ChannelUpdate,
    };
  }

  private async updateVoiceState(user: SelfUserDocument) {
    console.log("update voice state")
    await deps.dataSource
      .createQueryBuilder()
      .update(User)
      .andWhere("id = :id", { id: user.id })
      .set({ voice: '' })
      .execute();
  }
}
