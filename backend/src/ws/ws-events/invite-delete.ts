import { WS } from "../../types";
import { Socket } from "socket.io";
import { WebSocket } from "../websocket";
import { WSEvent } from ".";
import { Invite } from "../../data/entity/Invite";

export default class implements WSEvent<"INVITE_DELETE"> {
  on = "INVITE_DELETE" as const;

  public async invoke(
    ws: WebSocket,
    client: Socket,
    { inviteCode }: WS.Params.InviteDelete
  ) {
    const invite = await deps.invites.get(inviteCode);
    await deps.wsGuard.validateCan(client, invite.guildId, "MANAGE_GUILD");

    await deps.dataSource
      .createQueryBuilder()
      .delete()
      .from(Invite)
      .where("id = :id", { id: invite.id })
      .execute();

    return [
      {
        emit: this.on,
        to: [invite.guildId],
        send: { guildId: invite.guildId, inviteCode } as WS.Args.InviteDelete,
      },
    ];
  }
}
