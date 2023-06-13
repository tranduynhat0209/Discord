import { WSCooldowns } from "../ws/modules/ws-cooldowns";
import { WSGuard } from "../ws/modules/ws-guard";
import { WSRooms } from "../ws/modules/ws-rooms";
import { WebSocket } from "../ws/websocket";
import Channels from "../data/channels";
import GuildMembers from "../data/guild-members";
import Guilds from "../data/guilds";
import Invites from "../data/invites";
import Messages from "../data/messages";
import Pings from "../data/pings";
import Roles from "../data/roles";
import Users from "../data/users";
import ChannelJoin from "../ws/ws-events/channel-join";
import ChannelLeave from "../ws/ws-events/channel-leave";
import { AppDataSource } from "../data/utils/data-source";
import { DataSource } from "typeorm";
import { VoiceService } from "../voice/voice-service";
import { Email } from "../email/email";
import { Verification } from "../email/verification";
import { EmailFunctions } from "../email/email-functions";
import { REST } from "../rest/server";
import DMs from "../data/dm";

export interface Deps {
  channels: Channels;
  channelJoin: ChannelJoin;
  channelLeave: ChannelLeave;
  guilds: Guilds;
  guildMembers: GuildMembers;
  invites: Invites;
  messages: Messages;
  pings: Pings;
  roles: Roles;
  users: Users;
  wsCooldowns: WSCooldowns;
  wsGuard: WSGuard;
  wsRooms: WSRooms;
  webSocket: WebSocket;
  dataSource: DataSource;
  voiceService: VoiceService;
  email: Email;
  emailFunctions: EmailFunctions;
  verification: Verification;
  rest: REST;
  dms: DMs;
}

const deps: Deps = {
  channels: new Channels(),
  channelJoin: new ChannelJoin(),
  channelLeave: new ChannelLeave(),
  guilds: new Guilds(),
  guildMembers: new GuildMembers(),
  invites: new Invites(),
  messages: new Messages(),
  pings: new Pings(),
  roles: new Roles(),
  users: new Users(),
  wsCooldowns: new WSCooldowns(),
  wsGuard: new WSGuard(),
  wsRooms: new WSRooms(),
  webSocket: new WebSocket(),
  dataSource: AppDataSource,
  voiceService: new VoiceService(),
  email: new Email(),
  emailFunctions: new EmailFunctions(),
  verification: new Verification(),
  rest: new REST(),
  dms: new DMs(),
};

global["deps"] = deps;
