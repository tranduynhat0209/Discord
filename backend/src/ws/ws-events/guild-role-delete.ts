import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { WS } from "../../types";
import { Role } from "../../data/entity/Role";
import { Guild_Member } from "../../data/entity/Guild-member";

export default class implements WSEvent<"GUILD_ROLE_DELETE"> {
  public on = "GUILD_ROLE_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { guildId, roleId }: WS.Params.GuildRoleDelete
  ) {
    const role = await deps.roles.get(roleId);
    if (guildId !== role.guildId)
      throw new TypeError("roleId doesn't exist in the guild");
    await deps.wsGuard.validateCan(client, guildId, "MANAGE_ROLES");
    if (role.name === "@everyone")
      throw new TypeError("This role cannot be deleted");

    await deps.dataSource
      .createQueryBuilder()
      .update(Role)
      .where("guildId = :guildId", { guildId: guildId })
      .andWhere("position > :position", { position: role.position })
      .set({
        position: () => "position - 1",
      })
      .execute();

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Role)
      .where("id = :id", { id: roleId })
      .execute();

    let members = await deps.dataSource.manager.findBy(Guild_Member, {
      guildId,
    });
    for (let member of members) {
      const index = member.roleIds.indexOf(roleId);
      if (index !== -1) member.roleIds.splice(index, 1);
      await deps.guildMembers.save(member);
    }

    return [
      {
        emit: this.on,
        to: [guildId],
        send: { guildId, roleId } as WS.Args.GuildRoleDelete,
      },
    ];
  }
}
