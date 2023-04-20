import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Entity, WS } from "../../types";

export default class implements WSEvent<"CHANNEL_UPDATE"> {
  public on = "CHANNEL_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { position, name, summary, overrides, channelId }: WS.Params.ChannelUpdate
  ) {
    return [];
  }
}
