import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Entity, WS } from "../../types";

export default class implements WSEvent<"DM_CREATE"> {
  on = "DM_CREATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { attachmentURLs, toId, content, embed }: WS.Params.DMCreate
  ) {
    const authorId = ws.sessions.userId(client);

    const [dm, author] = await Promise.all([
      deps.dms.getByUserIds(authorId, toId),
      deps.users.getSelf(authorId),
    ]);

    var message = (await deps.messages.create(authorId, dm.id, {
      attachmentURLs,
      content,
      embed,
    })) as Entity.Message;

    dm.lastMessageId = message.id;
    await deps.dms.save(dm);

    await deps.pings.markAsRead(author, message);

    return [
      {
        emit: this.on,
        to: [dm.id],
        send: { message } as WS.Args.DMCreate,
      },
    ];
  }
}
