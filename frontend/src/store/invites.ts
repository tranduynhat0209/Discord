import { Entity, WS } from "../types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as api } from "./api";
import { notInArray } from "./utils/filter";
import { getHeaders } from "./utils/rest-headers";
import { Action, AppState } from ".";

const slice = createSlice({
  name: "invites",
  initialState: {
    list: [] as Entity.Invite[],
  } as AppState["entities"]["invites"],
  reducers: {
    fetched: ({ list }, { payload }: Action<Entity.Invite[]>) => {
      list.push(...payload.filter(notInArray(list)));
    },
    created: ({ list }, { payload }: Action<WS.Args.InviteCreate>) => {
      const index = list.findIndex((i) => i.id === payload.invite.id);
      if (index === -1) list.push(payload.invite);
    },
    deleted: ({ list }, { payload }: Action<WS.Args.InviteDelete>) => {
      const index = list.findIndex((i) => i.id === payload.inviteCode);
      if (index !== -1) list.splice(index, 1);
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const fetchInvite =
  (id: string) => (dispatch, getStore: () => AppState) => {
    const invites = getStore().entities.invites.list;
    const isCached = invites.some((i) => i.id === id);
    if (isCached) return;

    dispatch(
      api.restCallBegan({
        url: `/invites/${id}`,
        headers: getHeaders(),
        callback: (invite: Entity.Invite) =>
          dispatch(actions.fetched([invite])),
      })
    );
  };

export const createInvite = (guildId: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "INVITE_CREATE",
      data: { guildId } as WS.Params.InviteCreate,
    })
  );
};

export const getInvite = (id: string | undefined) =>
  createSelector(
    (state: AppState) => state.entities.invites.list,
    (invites) => invites.find((i) => i.id === id)
  );

export const deleteInvite = (inviteCode: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "INVITE_DELETE",
      data: { inviteCode } as WS.Params.InviteDelete,
    })
  );
};
