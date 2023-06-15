import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"READY"> {
  public on = "READY" as const;
  public cooldown = 5;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { token }: WS.Params.Ready
  ) {
    console.log("a READY event caught");
    const { id: userId } = await deps.wsGuard.decodeKey(token);

    console.log(userId);
    if (!userId) throw new TypeError("Invalid User ID");

    ws.sessions.set(client.id, userId);

    const user = await deps.users.get(userId);

    try {
      if (user.voice)
        await deps.channelJoin.invoke(ws, client, { channelId: user.voice });
    } catch {}

    user.status = "ONLINE";
    await deps.users.save(user);

    await deps.wsRooms.join(client, user);

    const selfUser = await deps.users.getSelf(userId);

    console.log(selfUser)
    return [
      {
        emit: "PRESENCE_UPDATE" as const,
        to: user.guildIds,
        send: {
          userId: user.id,
          status: user.status,
        } as WS.Args.PresenceUpdate,
      },
      {
        emit: this.on,
        to: [client.id],
        send: { user: selfUser } as WS.Args.Ready,
      },
    ];
  }
}
