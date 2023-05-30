import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Entity, WS } from "../../types";

export default class implements WSEvent<"MESSAGE_CREATE"> {
  on = "MESSAGE_CREATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { attachmentURLs, channelId, content, embed }: WS.Params.MessageCreate
  ) {
    const authorId = ws.sessions.userId(client);

    const [_, channel, author] = await Promise.all([
      deps.wsGuard.validateCanInChannel(client, channelId, "SEND_MESSAGES"),
      deps.channels.getText(channelId),
      deps.users.getSelf(authorId),
    ]);

    if (attachmentURLs && attachmentURLs.length > 0)
      await deps.wsGuard.validateCanInChannel(client, channelId, "SEND_FILES");

    var message = (await deps.messages.create(authorId, channelId, {
      attachmentURLs,
      content,
      embed,
    })) as Entity.Message;

    channel.lastMessageId = message.id;
    await deps.channels.save(channel);

    await deps.pings.markAsRead(author, message);

    return [
      {
        emit: this.on,
        to: [channelId],
        send: { message } as WS.Args.MessageCreate,
      },
    ];
  }
}
