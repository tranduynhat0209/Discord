import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Action, AppState } from ".";
import dmChannels from "./dm-channels";

type PingPayload = { channelId: string; guildId: string };
type Pings = { [guildId: string]: string[] };

const slice = createSlice({
  name: "pings",
  initialState: {} as Pings,
  reducers: {
    added: (pings, { payload }: Action<PingPayload>) => {
      if (!pings[payload.guildId]) pings[payload.guildId] = [];

      if (!pings[payload.guildId].includes(payload.channelId))
        pings[payload.guildId].push(payload.channelId);
    },
    channelMarkedAsRead: (pings, { payload }: Action<PingPayload>) => {
      let guildPings = pings[payload.guildId];
      if (!guildPings) guildPings = [];
      const index = guildPings.indexOf(payload.channelId);
      if (index !== -1) guildPings.splice(index, 1);
    },
    guildMarkedAsRead: (pings, { payload }: Action<PingPayload>) => {
      pings[payload.guildId] = [];
    },
  },
});
export const actions = slice.actions;
export default slice.reducer;

export const addPing =
  (channelId: string) => (dispatch, getState: () => AppState) => {
    const guildId = getState().entities.channels.find(
      (c) => c.id === channelId
    )!.guildId;
    dispatch(actions.added({ channelId, guildId }));
  };

export const addDMPing =
  (userId: string) => (dispatch, getState: () => AppState) => {
    dispatch(actions.added({ channelId: userId, guildId: "DM" }));
  };
export const pingWhenNotInChannel =
  (channelId: string) => (dispatch, getState: () => AppState) => {
    const activeChannelId = getState().ui.activeChannel?.id;
    if (activeChannelId !== channelId) {
      dispatch(addPing(channelId));
    }
  };

export const pingWhenNotInDMChannel =
  (channelId: string) => (dispatch, getState: () => AppState) => {
    const activeUserId = getState().ui.activeUser?.id;
    const user = getState().auth.user;
    const dmChannel = getState().entities.dmChannels.find(
      (c) => c.id === channelId
    );
    if (dmChannel) {
      const userId =
        dmChannel.userId0 === user?.id ? dmChannel.userId1 : dmChannel.userId0;

      if (activeUserId !== userId) {
        dispatch(
          // @ts-ignore
          addDMPing(userId)
        );
      }
    }
  };
export const pingUnreadChannelsAndGuilds =
  () => (dispatch, getState: () => AppState) => {
    const channels = getState().entities.channels;
    const dmChannels = getState().entities.dmChannels;
    const user = getState().auth.user;

    if (!user) {
      return;
    }
    const userChannelIds = Object.keys(user.lastReadMessageIds);
    const userLastMessagesIds = Object.values(user.lastReadMessageIds);
    for (let i = 0; i < userChannelIds.length; i++) {
      const channelId = userChannelIds[i];
      const channel = channels.find((c) => c.id === channelId);
      if (channel) {
        if (
          channel?.lastMessageId &&
          channel?.lastMessageId !== userLastMessagesIds[i]
        ) {
          dispatch(addPing(channelId));
        }
      }
      const dmChannel = dmChannels.find((c) => c.id === channelId);
      if (dmChannel) {
        if (
          dmChannel?.lastMessageId &&
          dmChannel?.lastMessageId !== userLastMessagesIds[i]
        ) {
          console.log(dmChannel.lastMessageId + "-" + userLastMessagesIds[i]);
          if (user.id === dmChannel.userId0)
            dispatch(addDMPing(dmChannel.userId1));
          else if (user.id === dmChannel.userId1)
            dispatch(addDMPing(dmChannel.userId0));
        }
      }
    }
  };
