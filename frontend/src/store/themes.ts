/* eslint import/no-webpack-loader-syntax: off */
import { Entity, REST } from '../types';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { actions as api } from './api';
import { notInArray } from './utils/filter';
import { getHeaders } from './utils/rest-headers';
import { Action, AppState } from '.';

const slice = createSlice({
  name: 'themes',
  initialState: [{
    id: 'default',
    code: 'default',
    createdAt: new Date('05/02/2021'),
    creatorId: '177127942839676928',
    iconURL: '/images/themes/horizon.svg',
    isFeatured: true,
    name: 'Horizon (default)',
    styles: accordTheme,
  }, {
    id: 'discord',
    code: 'discord',
    createdAt: new Date('05/02/2021'),
    creatorId: '177127942839676928',
    iconURL: '/images/themes/discord.svg',
    isFeatured: true,
    name: 'Discord (built-in)',
    styles: discordTheme,
  }, {
    id: 'winter',
    code: 'winter',
    createdAt: new Date('30/12/2021'),
    creatorId: '177127942839676928',
    iconURL: '/images/themes/winter.svg',
    isFeatured: true,
    name: 'Winter (built-in)',
    styles: winterTheme,
  }] as AppState['entities']['themes'],
  reducers: {
    deleted: (themes, { payload }: Action<string>) => {
      const index = themes.findIndex(t => t.id === payload);
      themes.splice(index, 1);
    },
    fetched: (themes, { payload }: Action<Entity.Theme[]>) => {
      themes.push(...payload.filter(notInArray(themes)));
    },
    updated: (themes, { payload }: Action<Entity.Theme>) => {
      const index = themes.findIndex(t => t.id === payload.id);
      themes[index] = payload;
    },
  },
});
export const actions = slice.actions;
export default slice.reducer;

export const getTheme = (id: string, themes: Entity.Theme[]) => {
  return themes.find(t => t.id === id);
}

export const getThemeByCode = (code: string) => createSelector(
  state => state.entities.themes,
  themes => themes.find(t => t.code === code)
);

export const createTheme = (theme: Partial<Entity.Theme>, callback?: (theme: Entity.Theme) => any) => (dispatch) => {
  dispatch(api.restCallBegan({
    url: '/themes',
    method: 'post',
    headers: getHeaders(),
    data: { styles: themeTemplate, ...theme } as REST.To.Post['/themes'],
    callback: (theme: Entity.Theme) => {
      dispatch(actions.fetched([theme]));
      callback?.(theme);
    },
  }));
}

export const unlockTheme = (id: string, callback?: (theme: Entity.Theme) => any) => (dispatch) => {
  dispatch(api.restCallBegan({
    url: `/themes/${id}/unlock`,
    headers: getHeaders(),
    callback: (theme: Entity.Theme) => {
      dispatch(actions.fetched([theme]))
      callback(theme);
    },
  }));
}

export const updateTheme = (id: string, data: Partial<Entity.Theme>) => (dispatch) => {
  dispatch(api.restCallBegan({
    data,
    headers: getHeaders(),
    method: 'patch',
    url: `/themes/${id}`,
    callback: (theme: Entity.Theme) => dispatch(actions.updated(theme)),
  }));
}

export const deleteTheme = (id: string) => (dispatch) => {
  dispatch(api.restCallBegan({
    headers: getHeaders(),
    method: 'delete',
    url: `/themes/${id}`,
    callback: () => dispatch(actions.deleted(id)),
  }));
}

export const applyTheme = (styles: any = accordTheme) => {
  const themeWrapper = document.querySelector('#themeWrapper')!;
  themeWrapper.innerHTML = `<style>${styles}</style>`;
}