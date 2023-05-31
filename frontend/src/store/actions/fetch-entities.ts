import { REST } from '../../types';
import { actions as api } from '../api';
import { actions as auth } from '../auth';
import { actions as channelActions } from '../channels';
import { actions as guildActions } from '../guilds';
import { actions as memberActions } from '../members';
import { actions as meta } from '../meta';
import { actions as roleActions } from '../roles';
import { actions as userActions } from '../users';
import { getHeaders } from '../utils/rest-headers';

export default (guildIds?: string[]) => (dispatch) => {
  dispatch(api.restCallBegan({
    onSuccess: [],
    headers: getHeaders(),
    url: `/users/entities?guild_ids=${guildIds}`,
    callback: (data: REST.Return.Get['/users/entities']) => {
      dispatch(channelActions.fetched(data.channels));
      dispatch(guildActions.fetched(data.guilds));
      dispatch(memberActions.fetched(data.members));
      dispatch(roleActions.fetched(data.roles));
      dispatch(userActions.fetched(data.users));
      dispatch(meta.fetchedEntities());
    },
    errorCallback: () => dispatch(auth.loggedInAttempted()),
  }));
}