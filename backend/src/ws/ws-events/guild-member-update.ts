import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"GUILD_MEMBER_UPDATE"> {
  public on = "GUILD_MEMBER_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { memberId, roleIds }: WS.Params.GuildMemberUpdate
  ) {
    return [];
  }
}
