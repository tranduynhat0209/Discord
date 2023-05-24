import { WS } from "../types";
import DBWrapper from "./db-wrapper";
import { Invite } from "./entity/Invite";
import generateInvite from "./utils/generate_invite";

type InviteDocument = any;
export default class Invites extends DBWrapper<string, InviteDocument> {
  public async get(code: string | undefined): Promise<InviteDocument> {
    const invite = deps.dataSource.manager.findOneBy(Invite, { id: code });
  }

  public async create(
    { guildId, options }: WS.Params.InviteCreate,
    inviterId: string
  ) {
    return deps.dataSource.manager.save(Invite, {
      id: generateInvite(),
      guildId,
      inviterId,
      options,
      uses: 0,
    });
  }
}
