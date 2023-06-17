import { createSelector, createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { Entity } from '../types';
import { AppState } from '.';
import EventEmitter from 'events';

const slice = createSlice({
  name: 'ui',
  initialState: {} as AppState['ui'],
  reducers: {
    startedEditingMessage: (state, { payload }) => {
      state.editingMessageId = payload;
    },
    stoppedEditingMessage: (state) => {
      delete state.editingMessageId;
    },
    focusedResource: (state, { payload }) => {
      state.activeResource = payload;
    },
    focusedInvite: (state, { payload }) => {
      state.activeInvite = payload;
    },
    focusedUser: (state, { payload }) => {
      state.activeUser = payload;
    },
    pageSwitched: (state, { payload }) => {
      state.activeChannel = payload.channel;
      state.activeGuild = payload.guild;
    },
    openedModal: (state, { payload }) => {
      state.openModal = payload;
    },
    closedModal: (state) => {
      delete state.openModal;
    },
    toggleDropdown: (state, { payload }) => {
      state.openDropdown = payload?.name;
    },
    toggleSaveChanges: (state, { payload }) => {
      state.saveChangesOpen = payload;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;

export const dropdownIsOpen = (type: React.FunctionComponent) => createSelector(
  state => state.ui.openDropdown,
  name => name === type.name,
);
export const modalIsOpen = (type: React.FunctionComponent) => createSelector(
  state => state.ui.openModal,
  name => name === type.name,
);

export const openSaveChanges = (isOpen: boolean) => (dispatch, getState: () => AppState) => {
  if (getState().ui.saveChangesOpen === isOpen) return;

  dispatch(actions.toggleSaveChanges(isOpen));
}
export const angrySaveChanges = () => {
  const saveChanges = document.querySelector('#saveChanges') as HTMLDivElement;
  if (!saveChanges) return;

  saveChanges.style.backgroundColor = 'var(--danger)';
}

export const openUserProfile = (user: Entity.User) => (dispatch) => {
  dispatch(actions.focusedUser(user));
  dispatch(actions.openedModal('UserProfile'));
}
export const previewImage = (url: string) => (dispatch) => {
  dispatch(actions.focusedResource(url));
  dispatch(actions.openedModal('ImagePreview'));
}

export interface Dialog {
  content: string | JSX.Element;
  variant: 'default' | 'info' | 'error' | 'success' | 'warning';
}
export const openDialog = (dialog: Dialog) => () => new EventEmitter().emit('dialog', dialog);


export const closeModal = (dispatch) => {
  dispatch(actions.closedModal());
  dispatch(openSaveChanges(false));
  dispatch(actions.focusedUser(null));
};