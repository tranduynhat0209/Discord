import { Entity, UserTypes, WS } from "../types";
export interface AppState {
  auth: {
    attemptedLogin: boolean;
    shouldVerify: boolean;
    user?: UserTypes.Self;
  };
  config: {
    devMode: boolean;
    memberListToggled: boolean;
  };
  entities: {
    typing: { userId: string; channelId: string }[];
    channels: Entity.Channel[];
    dmChannels: Entity.DMChannel[];
    guilds: Entity.Guild[];
    members: Entity.GuildMember[];
    pings: { [guildId: string]: string[] };
    roles: Entity.Role[];
    users: Entity.User[];
    // themes: Entity.Theme[];
    // sequential - loaded when needed
    invites: {
      fetched: string[];
      list: Entity.Invite[];
    };
    messages: {
      total: { [channelId: string]: number };
      list: Entity.Message[];
    };
  };
  meta: {
    fetchedEntities: boolean;
    hasListenedToWS: boolean;
    ping?: number;
    userCount?: number;
  };
  ui: {
    openDropdown?: string;
    openModal?: { content: string; variant: "info" | "error" };
    activeChannel?: Entity.Channel;
    activeResource?: string;
    activeGuild?: Entity.Guild;
    activeInvite?: Entity.Invite;
    activeUser?: Entity.User;
    editingMessageId?: string;
    saveChangesOpen?: boolean;
    openVerification?: boolean;
    openUserProfile?: boolean;
  };
}

export interface Action<P> {
  type: string;
  payload: P;
}
