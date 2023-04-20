import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"READY"> {
  public on = "READY" as const;
  public cooldown = 5;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { token }: WS.Params.Ready
  ) {
    return [];
  }
}
