import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '.';

const get = (key: keyof AppState['config']) =>
  JSON.parse(localStorage.getItem(`config.${key as string}`) as any);
const set = (key: keyof AppState['config'], value: any) =>
  localStorage.setItem(`config.${key as string}`, value);

const slice = createSlice({
  name: 'config',
  initialState: {
    devMode: get('devMode') ?? false,
    memberListToggled: get('memberListToggled') ?? true,
  } as AppState['config'],
  reducers: {
    toggleDevMode: (config) => {
      const value = !config.devMode;
      config.devMode = value;
    },
    toggleMemberList: (config) => {
      const value = !config.memberListToggled;
      config.memberListToggled = value;
    },
  }
});
const actions = slice.actions;
export default slice.reducer;

export const toggleDevMode = () => (dispatch, getState: () => AppState) => {
  const config = getState().config;

  dispatch(actions.toggleDevMode());
  set('devMode', !config.devMode);
}
export const toggleMemberList = () => (dispatch, getState: () => AppState) => {
  const config = getState().config;

  dispatch(actions.toggleMemberList());
  set('memberListToggled', !config.memberListToggled);
}