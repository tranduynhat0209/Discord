import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Guild } from "../../data/entity/Guild";

export default class implements WSEvent<"GUILD_UPDATE"> {
  public on = "GUILD_UPDATE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { guildId, name, iconURL, systemChannelId }: WS.Params.GuildUpdate
  ) {
    await deps.wsGuard.validateCan(client, guildId, "MANAGE_GUILD");

    const guild = await deps.guilds.get(guildId);
    const partial: Partial<Guild> = {};
    const hasChanged = (key: string, value: any) =>
      value && guild[key] !== value;

    if (hasChanged("iconURL", iconURL)) partial.iconURL = iconURL;
    if (hasChanged("name", name)) partial.name = name!;
    if (hasChanged("systemChannelId", systemChannelId))
      partial.systemChannelId = systemChannelId!;

    await deps.dataSource
      .createQueryBuilder()
      .update(Guild)
      .set(partial)
      .where("id = :id", { id: guildId })
      .execute();

    return [
      {
        emit: this.on,
        to: [guildId],
        send: { guildId, partialGuild: partial } as WS.Args.GuildUpdate,
      },
    ];
  }
}
