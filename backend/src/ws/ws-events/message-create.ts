import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { WS } from "../../types";

export default class implements WSEvent<"MESSAGE_CREATE"> {
  on = "MESSAGE_CREATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { attachmentURLs, channelId, content, embed }: WS.Params.MessageCreate
  ) {
    return [];
  }
}
