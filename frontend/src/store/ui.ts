import { createSelector, createSlice } from "@reduxjs/toolkit";
import React from "react";
import { Entity } from "../types";
import { AppState } from ".";
import EventEmitter from "events";

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
    }
  },
});

export const actions = slice.actions;
export default slice.reducer;
