import { Socket } from "socket.io";
import { PermissionTypes, getPermString } from "../../types";

export class WSGuard {
  public userId(client: Socket) {}

  public validateIsUser(client: Socket, userId: string) {}

  public async validateIsOwner(client: Socket, guildId: string) {}

  public async validateCan(
    client: Socket,
    guildId: string,
    permission: PermissionTypes.PermissionString
  ) {}

  public async validateCanInChannel(
    client: Socket,
    channelId: string,
    permission: PermissionTypes.PermissionString
  ) {}

  private async can(
    permission: PermissionTypes.PermissionString,
    guildId: string,
    userId: string
  ) {}

  public async canInChannel(
    permission: PermissionTypes.PermissionString,
    channelId: string,
    userId: string
  ) {}

  public async decodeKey(token: string) {
    return { id: await deps.users.verifyToken(token) };
  }
}
