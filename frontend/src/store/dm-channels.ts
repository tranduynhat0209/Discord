import { Entity, WS, ChannelTypes } from "../types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { actions as api } from "./api";
import { notInArray } from "./utils/filter";
import { Action, AppState } from ".";

const slice = createSlice({
  name: "dmChannels",
  initialState: [] as AppState["entities"]["dmChannels"],
  reducers: {
    fetched: (dmChannels, { payload }: Action<Entity.DMChannel[]>) => {
      dmChannels.push(...payload.filter(notInArray(dmChannels)));
    },
    created: (channels, { payload }: Action<WS.Args.DMChannelCreate>) => {
      channels.push(...[payload.dmChannel].filter(notInArray(channels)));
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const sendDMMessage =
  ({ to, content, attachmentURLs, embed }: WS.Params.DMMessageCreate) =>
  (dispatch) => {
    dispatch(
      api.wsCallBegan({
        event: "DM_MESSAGE_CREATE",
        data: {
          to,
          content,
          attachmentURLs,
          embed,
        } as WS.Params.DMMessageCreate,
      })
    );
  };

export const deleteChannel = (channelId: string) => (dispatch) => {
  dispatch(
    api.wsCallBegan({
      event: "CHANNEL_DELETE",
      data: { channelId } as WS.Params.ChannelDelete,
    })
  );
};

export const updateChannel =
  (channelId: string, payload: Partial<Entity.Channel>) => (dispatch) => {
    dispatch(
      api.wsCallBegan({
        event: "CHANNEL_UPDATE",
        data: { channelId, ...payload } as WS.Params.ChannelDelete,
      })
    );
  };

export const getDMChannelWithUserId = (userId: string) =>
  createSelector(
    (state: AppState) => state.entities.dmChannels,
    (channels) =>
      channels.find((c) => c.userId0 === userId || c.userId1 === userId)
  );
