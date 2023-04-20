import { Entity, WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"USER_UPDATE"> {
  on = "USER_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    {
      token,
      username,
      avatarURL,
      ignored,
      email,
      activeThemeId,
    }: WS.Params.UserUpdate
  ) {
    return [];
  }
}
