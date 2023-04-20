import { WS } from "../types";
import DBWrapper from "./db-wrapper";

type InviteDocument = any;
export default class Invites extends DBWrapper<string, InviteDocument> {
  public async get(code: string | undefined): Promise<InviteDocument> {}

  public async create(
    { guildId, options }: WS.Params.InviteCreate,
    inviterId: string
  ) {}
}
