import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WS } from "../../types";
import { WSEvent } from ".";

export default class implements WSEvent<"CHANNEL_DELETE"> {
  on = "CHANNEL_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { channelId }: WS.Params.ChannelDelete
  ) {
    if (!channelId) throw new TypeError("Not enough options were provided");

    return [
      {
        emit: this.on,
        to: [],
        send: {},
      },
    ];
  }
}
