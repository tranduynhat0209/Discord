import { createSelector, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { actions as api } from "./api";
import { Action, AppState } from ".";

const slice = createSlice({
    name: "typing",
    initialState: [] as AppState["entities"]["typing"],
    reducers: {
        userTyped: (
            typing,
            { payload }: Action<{ channelId: string; userId: string }>
        ) => {
            typing.push(payload);
        },
        userStoppedTyping: (
            typing,
            { payload }: Action<{ channelId: string; userId: string }>
        ) => {
            const index = getIndex(typing, payload.userId, payload.channelId);
            typing.splice(index, 1);
        },
    },
});

const getIndex = (typing: any[], userId: string, channelId: string) => {
    return typing.findIndex(
        (t) => t.channelId === channelId && t.userId === userId
    );
};

export const actions = slice.actions;
export default slice.reducer;

export const getTypersInChannel = (channelId: string) =>
    createSelector(
        (state) => state.entities.typing,
        (typing: any) => typing.filter((t) => t.channelId === channelId)
    );

let lastTypedAt: Date;

export const startTyping =
    (channelId: string) => (dispatch, getState: () => AppState) => {
        const secsAgo = moment(new Date()).diff(lastTypedAt, "seconds");
        if (lastTypedAt && secsAgo < 5) return;

        lastTypedAt = new Date();

        dispatch(
            api.wsCallBegan({
                event: "TYPING_START",
                data: { channelId },
            })
        );
    };
