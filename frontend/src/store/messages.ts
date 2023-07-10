import { REST, WS, Entity } from "../types";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { actions as api, uploadFile } from "./api";
import { notInArray } from "./utils/filter";
import { getHeaders } from "./utils/rest-headers";
import { Action, AppState } from ".";

const slice = createSlice({
    name: "messages",
    initialState: {
        total: {},
        list: [],
    } as AppState["entities"]["messages"],
    reducers: {
        fetched: (
            { list, total },
            {
                payload,
            }: Action<REST.Return.Get["/channels/:channelId/messages"]>
        ) => {
            list.unshift(...payload.list.filter(notInArray(list)));
            total[payload.channelId] = payload.total;
        },
        created: (
            { list, total },
            { payload }: Action<WS.Args.MessageCreate>
        ) => {
            const newMsgs = [payload.message].filter(notInArray(list));
            list.push(...newMsgs);
            total[payload.message.channelId] += newMsgs.length;
        },
        deleted: (
            { list, total },
            { payload }: Action<WS.Args.MessageDelete>
        ) => {
            const index = list.findIndex((m) => m.id === payload.messageId);
            if (index !== -1) list.splice(index, 1);
            total[payload.channelId]--;
        },
        updated: ({ list }, { payload }: Action<WS.Args.MessageUpdate>) => {
            const message = list.find((m) => m.id === payload.messageId);
            Object.assign(message, payload.partialMessage);
        },
    },
});

export const getChannelMessages = (channelId: string) =>
    createSelector(
        (state: AppState) => state.entities.messages.list,
        (messages) => messages.filter((m) => m.channelId === channelId)
    );

export const fetchMessages =
    (channelId: string, back = 25) =>
    (dispatch, getState: () => AppState) => {
        const { messages } = getState().entities;
        if (messages.list.length === messages.total[channelId]) return;

        dispatch(
            api.restCallBegan({
                onSuccess: [actions.fetched.type],
                url: `/channels/${channelId}/messages?back=${back}`,
                headers: getHeaders(),
            })
        );
    };

export const createMessage =
    (
        channelId: string,
        payload: Partial<Entity.Message>,
        attachmentURLs?: string[]
    ) =>
    (dispatch) => {
        dispatch(
            api.wsCallBegan({
                event: "MESSAGE_CREATE",
                data: {
                    ...payload,
                    channelId,
                    attachmentURLs,
                } as WS.Params.MessageCreate,
            })
        );
    };

// each file is uploaded individually as a separate API call
export const uploadFileAsMessage =
    (channelId: string, payload: Partial<Entity.Message>, file: File) =>
    (dispatch) => {
        const uploadCallback = async ({ url }: REST.Return.Post["/upload"]) =>
            dispatch(createMessage(channelId, payload, [url]));
        dispatch(uploadFile(file, uploadCallback));
    };

export const updateMessage =
    (id: string, payload: Partial<Entity.Message>) => (dispatch) => {
        dispatch(
            api.wsCallBegan({
                event: "MESSAGE_UPDATE",
                data: { messageId: id, ...payload },
            })
        );
    };

export const deleteMessage = (id: string) => (dispatch) => {
    dispatch(
        api.wsCallBegan({
            event: "MESSAGE_DELETE",
            data: { messageId: id },
        })
    );
};

export const actions = slice.actions;
export default slice.reducer;
