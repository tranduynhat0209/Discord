import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Message } from "../../data/entity/Message";

export default class implements WSEvent<"MESSAGE_DELETE"> {
  on = "MESSAGE_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { messageId }: WS.Params.MessageDelete
  ) {
    const message = await deps.messages.get(messageId);
    const channel = await deps.channels.get(message.channelId);

    try {
      deps.wsGuard.validateIsUser(client, message.authorId);
    } catch {}
    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where("id = :id", { id: messageId })
      .execute();

    if (message.id === channel.lastMessageId) {
      const channelMsgs = await deps.messages.getChannelMessages(channel.id);
      const newLastMessage = channelMsgs[channelMsgs.length - 1];
      channel.lastMessageId = newLastMessage?.id;
      await deps.channels.save(channel);
    }

    return [
      {
        emit: this.on,
        to: [message.channelId],
        send: {
          channelId: message.channelId,
          messageId,
        } as WS.Args.MessageDelete,
      },
    ];
  }
}
