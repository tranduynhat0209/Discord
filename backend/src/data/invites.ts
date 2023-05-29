import { APIError } from "../rest/modules/api-error";
import { WS } from "../types";
import DBWrapper from "./db-wrapper";
import { Invite } from "./entity/Invite";
import generateInvite from "./utils/generate_invite";

type InviteDocument = any;
export default class Invites extends DBWrapper<string, InviteDocument> {
  public async get(code: string | undefined): Promise<InviteDocument> {
    const invite = deps.dataSource.manager.findOneBy(Invite, { id: code });

    if (!invite) throw new APIError(404, "Invite Not Found");
    return invite;
  }

  public async create(
    { guildId, options }: WS.Params.InviteCreate,
    inviterId: string
  ) {
    const id = generateInvite();
    await deps.dataSource.manager.save(Invite, {
      id,
      guildId,
      inviterId,
      options,
      uses: 0,
    });

    return await this.get(id);
  }
}
