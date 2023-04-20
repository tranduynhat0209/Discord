import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"MESSAGE_DELETE"> {
  on = "MESSAGE_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { messageId }: WS.Params.MessageDelete
  ) {
    return [];
  }
}
