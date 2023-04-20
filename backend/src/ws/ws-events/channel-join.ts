import { WebSocket } from "../websocket";
import { Socket } from "socket.io";
import { WS } from "../../types";
import { WSEvent } from ".";

export default class implements WSEvent<"CHANNEL_JOIN"> {
  on = "CHANNEL_JOIN" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { channelId }: WS.Params.ChannelJoin
  ) {
    return [];
  }
}
