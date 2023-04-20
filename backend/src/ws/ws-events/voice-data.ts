import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"VOICE_DATA"> {
  on = "VOICE_DATA" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { channelId, blob }: WS.Params.VoiceData
  ) {
    return [];
  }
}
