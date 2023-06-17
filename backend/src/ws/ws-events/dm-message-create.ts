import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Entity, WS } from "../../types";
import { DMChannel } from "../../data/entity/Direct-message";

export default class implements WSEvent<"DM_MESSAGE_CREATE"> {
  on = "DM_MESSAGE_CREATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { attachmentURLs, content, embed, to }: WS.Params.DMMessageCreate
  ) {
    const authorId = ws.sessions.userId(client);
    const author = await deps.users.getSelf(authorId);

    let isNew = false;
    let dmChannel: DMChannel;
    try {
      dmChannel = await deps.dmChannels.getByUserIds(authorId, to);
    } catch (err) {
      isNew = true;
      console.log("create new DM Channel");
      dmChannel = await deps.dmChannels.create({
        userId0: authorId,
        userId1: to,
      });
    }
    const channelId = dmChannel.id;
    var message = (await deps.messages.create(authorId, channelId, {
      attachmentURLs,
      content,
      embed,
    })) as Entity.Message;

    dmChannel.lastMessageId = message.id;
    await deps.dmChannels.save(dmChannel);

    await deps.pings.markAsRead(author, message);

    const toClientId = ws.sessions.getClientIdFromUserId(to);
    const result: any[] = [
      {
        emit: this.on,
        to: [client.id, toClientId],
        send: { message } as WS.Args.DMMessageCreate,
      },
    ];
    if (isNew)
      result.push({
        emit: "DM_CHANNEL_CREATE" as const,
        to: [client.id, toClientId],
        send: { dmChannel } as WS.Args.DMChannelCreate,
      });
    return result;
  }
}
