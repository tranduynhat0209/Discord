import { Entity, WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { User } from "../../data/entity/User";

export default class implements WSEvent<"USER_UPDATE"> {
  on = "USER_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { token, username, avatarURL, ignored }: WS.Params.UserUpdate
  ) {
    const { id: userId } = await deps.wsGuard.decodeKey(token);
    const user = await deps.users.getSelf(userId);

    const partial: Partial<Entity.User> = {};
    const hasChanged = (key: string, value: any) =>
      value && user[key] !== value;

    if (hasChanged("avatarURL", avatarURL)) partial["avatarURL"] = avatarURL;
    if (hasChanged("ignored", ignored)) partial["ignored"] = ignored;
    if (hasChanged("username", username)) {
      partial["username"] = username;
      partial["discriminator"] = await deps.users.getDiscriminator(username!);
    }

    await deps.dataSource
      .createQueryBuilder()
      .update(User)
      .set(partial)
      .where("id = :id", { id: userId })
      .execute();

    return [
      {
        emit: this.on,
        to: [client.id],
        send: { userId, partialUser: partial } as WS.Args.UserUpdate,
      },
    ];
  }
}
