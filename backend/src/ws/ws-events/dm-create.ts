import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Entity, WS } from "../../types";
import { DM } from "../../data/entity/DM";

export default class implements WSEvent<"DM_CREATE"> {
  on = "DM_CREATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { attachmentURLs, toId, content, embed }: WS.Params.DMCreate
  ) {
    const authorId = ws.sessions.userId(client);

    const author = await deps.users.getSelf(authorId);

    let dm: DM;
    try{
      dm = await deps.dms.getByUserIds(authorId, toId);
    }catch(err){
      dm = await deps.dms.create({
        user0Id: authorId,
        user1Id: toId
      })
    }
    

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
