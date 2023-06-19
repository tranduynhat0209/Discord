import { createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";

const slice = createSlice({
  name: "ui",
  initialState: {} as AppState["ui"],
  reducers: {
    startedEditingMessage: (state, { payload }) => {
      state.editingMessageId = payload;
    },
    stoppedEditingMessage: (state) => {
      delete state.editingMessageId;
    },
    focusedChannel: (state, { payload }) => {
      state.activeChannel = payload;
    },
    unfocusedChannel: (state) => {
      state.activeChannel = undefined;
    },
    focusedResource: (state, { payload }) => {
      state.activeResource = payload;
    },
    focusedInvite: (state, { payload }) => {
      state.activeInvite = payload;
    },
    unfocusedInvite: (state) => {
      state.activeInvite = undefined;
    },
    focusedUser: (state, { payload }) => {
      state.activeUser = payload;
    },
    pageSwitched: (state, { payload }) => {
      state.activeChannel = payload.channel;
      state.activeGuild = payload.guild;
    },
    openModal: (state, { payload }) => {
      state.openModal = payload;
    },
    closeModal: (state) => {
      delete state.openModal;
    },
    toggleDropdown: (state, { payload }) => {
      state.openDropdown = payload?.name;
    },
    toggleSaveChanges: (state, { payload }) => {
      state.saveChangesOpen = payload;
    },
    openVerificationForm: (state) => {
      state.openVerification = true;
    },
    closeVerificationForm: (state) => {
      delete state.openVerification;
    },
    openUserProfile: (state) => {
      state.openUserProfile = true;
    },
    closeUserProfile: (state) => {
      delete state.openUserProfile;
    },
    focusGuild: (state, { payload }) => {
      state.activeGuild = payload;
    },
    unfocusGuild: (state) => {
      delete state.activeGuild;
    },
    openDirectMessagePage: (state) => {
      state.openDirectMessage = true;
    },
    closeDirectMessagePage: (state) => {
      delete state.openDirectMessage;
    },
    switchFromDMToGuild: (state, { payload }) => {
      delete state.openDirectMessage;
      delete state.activeUser;
      delete state.activeChannel;
      state.activeGuild = payload;
    },
    switchFromGuildToDM: (state) => {
      delete state.activeGuild;
      delete state.activeChannel;
      delete state.activeUser;
      state.openDirectMessage = true;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
