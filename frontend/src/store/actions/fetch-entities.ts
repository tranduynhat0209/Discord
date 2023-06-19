import { REST } from "../../types";
import { actions as api } from "../api";
import { actions as auth } from "../auth";
import { actions as channelActions } from "../channels";
import { actions as guildActions } from "../guilds";
import { actions as memberActions } from "../members";
import { actions as meta } from "../meta";
import { actions as roleActions } from "../roles";
import { actions as userActions } from "../users";
import { actions as dmChannelActions } from "../dm-channels";
import { getHeaders } from "../utils/rest-headers";
import { pingUnreadChannelsAndGuilds } from "../pings";

export default () => (dispatch) => {
  dispatch(
    api.restCallBegan({
      onSuccess: [],
      headers: getHeaders(),
      url: `/users/entities`,
      callback: (data: REST.Return.Get["/users/entities"]) => {
        dispatch(channelActions.fetched(data.channels));
        dispatch(guildActions.fetched(data.guilds));
        dispatch(memberActions.fetched(data.members));
        dispatch(roleActions.fetched(data.roles));
        dispatch(userActions.fetched(data.users));
        dispatch(dmChannelActions.fetched(data.dmChannels));
        dispatch(pingUnreadChannelsAndGuilds());
        dispatch(meta.fetchedEntities());
      },
      errorCallback: () => dispatch(auth.loggedInAttempted()),
    })
  );
};
