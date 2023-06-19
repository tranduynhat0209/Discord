import { Entity, WS, REST } from "../types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { byAscending } from "./utils/sort";
import { actions as api, uploadFile } from "./api";
import { notInArray } from "./utils/filter";
import { getHeaders } from "./utils/rest-headers";
import { actions as inviteActions } from "./invites";
import { Action, AppState } from ".";

const slice = createSlice({
  name: "guilds",
  initialState: [] as AppState["entities"]["guilds"],
  reducers: {
    fetched: (guilds, { payload }: Action<Entity.Guild[]>) => {
      guilds.push(...payload.filter(notInArray(guilds)));
    },
    created: (guilds, { payload }: Action<WS.Args.GuildCreate>) => {
      const guild = guilds.find((g) => g.id === payload.guild.id);
      if (!guild) guilds.push(payload.guild);
    },
    updated: (guilds, { payload }: Action<WS.Args.GuildUpdate>) => {
      const guild = guilds.find((g) => g.id === payload.guildId);
      Object.assign(guild, payload.partialGuild);
    },
    deleted: (guilds, { payload }) => {
      const index = guilds.findIndex((u) => u.id === payload.guildId);
      guilds.splice(index, 1);
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const createGuild = (name: string, iconURL?: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "GUILD_CREATE",
      data: { name, iconURL } as WS.Params.GuildCreate,
    })
  );
};

export const updateGuild =
  (guildId: string, payload: Partial<Entity.Guild>) => (dispatch) => {
    dispatch(
      api.wsCallBegan({
        event: "GUILD_UPDATE",
        data: { guildId, ...payload } as WS.Params.GuildUpdate,
      })
    );
  };

export const updateGuildWithIcon =
  (guildId: string, name: string, file: File) => (dispatch) => {
    const uploadCallback = async ({ url }: REST.Return.Post["/upload"]) =>
      dispatch(updateGuild(guildId, { name, iconURL: url }));
    dispatch(uploadFile(file, uploadCallback));
  };
export const uploadGuildIcon = (guildId: string, file: File) => (dispatch) => {
  const uploadCallback = async ({ url }: REST.Return.Post["/upload"]) =>
    dispatch(updateGuild(guildId, { iconURL: url }));
  dispatch(uploadFile(file, uploadCallback));
};

export const createGuildWithIcon = (name: string, file: File) => (dispatch) => {
  const uploadCallback = async ({ url }: REST.Return.Post["/upload"]) =>
    dispatch(createGuild(name, url));
  dispatch(uploadFile(file, uploadCallback));
};
export const fetchGuildInvites = (id: string) => (dispatch) => {
  console.log("fetching invitation");
  dispatch(
    api.restCallBegan({
      url: `/guilds/${id}/invites`,
      headers: getHeaders(),
      callback: (invites: Entity.Invite[]) =>
        dispatch(inviteActions.fetched(invites)),
    })
  );
};

export const deleteGuild = (guildId: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "GUILD_DELETE",
      data: { guildId } as WS.Params.GuildDelete,
    })
  );
};

export const getGuild = (id: string) =>
  createSelector(
    (state: AppState) => state.entities.guilds,
    (guilds) => guilds.find((g) => g.id === id)
  );

export const getGuildChannels = (guildId: string | undefined) =>
  createSelector(
    (state: AppState) => state.entities.channels,
    (channels) => channels.filter((c) => c.guildId === guildId)
  );

export const getGuildInvites = (guildId: string | undefined) =>
  createSelector(
    (state: AppState) => state.entities.invites.list,
    (invites) => invites.filter((i) => i.guildId === guildId)
  );

export const getGuildMembers = (guildId: string | undefined) =>
  createSelector(
    (state: AppState) => state.entities.members,
    (members) => members.filter((m) => m.guildId === guildId)
  );

export const getGuildRoles = (guildId: string | undefined) =>
  createSelector(
    (state: AppState) => state.entities.roles,
    (role) =>
      role.filter((r) => r.guildId === guildId).sort(byAscending("position"))
  );

export const getGuildUsers = (guildId: string | undefined) =>
  createSelector(
    (state: AppState) => ({
      members: state.entities.members,
      users: state.entities.users,
    }),
    ({ members, users }) =>
      members
        .filter((m) => m.guildId === guildId)
        .map((m) => users.find((u) => u.id === m.userId)!)
  );

export const isOwner = (guildId: string) =>
  createSelector(
    (state: AppState) => ({
      user: state.auth.user,
      guilds: state.entities.guilds,
    }),
    ({ user, guilds }) => {
      const guild = guilds.find((g) => g.id === guildId);
      return guild && guild.ownerId === user?.id;
    }
  );
