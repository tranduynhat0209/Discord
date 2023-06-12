import { Entity, WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"MESSAGE_UPDATE"> {
  public on = "MESSAGE_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { messageId, content, embed }: WS.Params.MessageUpdate
  ) {
    const message = await deps.messages.get(messageId);
    const channel = await deps.channels.get(message.channelId);

    deps.wsGuard.validateIsUser(client, message.authorId);

    const partial: Partial<Entity.Message> = {};
    if (content) partial.content = content;
    if (embed) partial.embed = embed;
    partial.updatedAt = new Date();

    Object.assign(message, partial);
    await deps.messages.save(message);


    return [{
      emit: this.on,
      to: [message.channelId],
      send: { messageId, partialMessage: partial } as WS.Args.MessageUpdate,
    }];
  }
}
