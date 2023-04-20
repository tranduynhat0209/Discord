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
    return [];
  }
}
