import { WSEvent } from ".";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WS } from "../../types";
import generateInvite from "../../data/utils/generate_invite";

export default class implements WSEvent<"USER_DELETE"> {
  public on = "USER_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { token }: WS.Params.UserDelete
  ) {
    const { id: userId } = await deps.wsGuard.decodeKey(token);
    const user = await deps.users.get(userId);

    const partialUser = {
      discriminator: 0,
      locked: true,
      username: `Deleted User ${generateInvite(6)}`,
      email: generateInvite(16),
      salt: null,
      hash: null,
    };
    Object.assign(user, partialUser);
    await deps.users.save(user);

    client.emit("USER_DELETE");

    return [
      {
        emit: this.on,
        to: [userId],
        send: { userId: user.id, partialUser } as WS.Args.UserDelete,
      },
    ];
  }
}
