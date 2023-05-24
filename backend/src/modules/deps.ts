import Channels from "../data/channels";
import GuildMembers from "../data/guild-members";
import Guilds from "../data/guilds";
import Invites from "../data/invites";
import Messages from "../data/messages";
import Pings from "../data/pings";
import Roles from "../data/roles";
import Users from "../data/users";

import Themes from "../data/themes";
import { AppDataSource } from "../data/utils/data-source";
import { DataSource } from "typeorm";

export interface Deps {
  channels: Channels;
  /** @deprecated */
  guilds: Guilds;
  guildMembers: GuildMembers;
  invites: Invites;
  messages: Messages;
  /** @deprecated */
  pings: Pings;
  roles: Roles;
  themes: Themes;
  users: Users;
  dataSource: DataSource;
}

const deps: Deps = {
  channels: new Channels(),
  guilds: new Guilds(),
  guildMembers: new GuildMembers(),
  invites: new Invites(),
  messages: new Messages(),
  pings: new Pings(),
  roles: new Roles(),
  themes: new Themes(),
  users: new Users(),
  dataSource: AppDataSource,
};

global["deps"] = deps;
