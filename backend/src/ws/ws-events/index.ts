import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";

type WSMessage = WS.ListenParams & WS.On;

export interface WSEvent<K extends keyof WSMessage> {
  on: K;
  cooldown?: number;
  invoke: (
    ws: WebSocket,
    client: Socket,
    params: WSMessage[K]
  ) => Promise<(WSAction<keyof WS.EmitParams> | undefined)[]>;
}

export interface WSAction<K extends keyof WS.EmitParams> {
  emit: K;
  to: string[]; // list of room
  send: WS.EmitParams[K];
}
