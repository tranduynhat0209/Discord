import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";

export default class implements WSEvent<"GUILD_CREATE"> {
  public on = "GUILD_CREATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { name }: WS.Params.GuildCreate
  ) {
    if (!name) throw new TypeError("Not enough options were provided");

    console.log("creating guild");
    const userId = ws.sessions.userId(client);
    const user = await deps.users.getSelf(userId);
    const guild = await deps.guilds.create({ name, ownerId: user.id });
    const entities = await deps.guilds.getEntities(guild.id);

    console.log(guild);
    await deps.wsRooms.joinGuildRooms(user, client);

    return [
      {
        emit: this.on,
        to: [client.id],
        send: { guild, ...entities } as WS.Args.GuildCreate,
      },
    ];
  }
}
