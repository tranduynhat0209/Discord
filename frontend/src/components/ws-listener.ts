import { useDispatch, useSelector, useStore } from "react-redux";
import ws from "../services/ws-service";
import { useEffect } from "react";
import { actions as users } from "../store/users";
import { actions as meta } from "../store/meta";
import { actions as uiActions } from "../store/ui";
import { actions as invites } from "../store/invites";
import { actions as members, getSelfMember } from "../store/members";
import { actions as roles } from "../store/roles";
import { actions as typing } from "../store/typing";
import { actions as guilds } from "../store/guilds";
import { actions as messages } from "../store/messages";
import { actions as channels } from "../store/channels";
import { actions as auth, logoutUser } from "../store/auth";
import {
  actions as pings,
  addPing,
  addDMPing,
  pingWhenNotInChannel,
  pingWhenNotInDMChannel,
} from "../store/pings";
import {
  startVoiceFeedback,
  stopVoiceFeedback,
} from "../services/voice-service";
import { AppState } from "../store";
import { useSnackbar } from "notistack";
import { actions as dmChannels } from "../store/dm-channels";

const WSListener: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const store = useStore();
  const hasListened = useSelector((s: AppState) => s.meta.hasListenedToWS);

  const state = useSelector((s: AppState) => s);

  useEffect(() => {
    if (hasListened) return;

    ws.on("error", (error: any) =>
      enqueueSnackbar(error.data?.message ?? error.message, {
        variant: "error",
      })
    );

    // add channel to guilds.channels
    ws.on("CHANNEL_CREATE", (args) => {
      dispatch(channels.created(args));
    });
    ws.on("CHANNEL_DELETE", (args) => {
      dispatch(channels.deleted(args));
    });
    ws.on("CHANNEL_UPDATE", (args) => dispatch(channels.updated(args)));
    ws.on("GUILD_CREATE", (args) => {
      dispatch(users.fetched(args.users)); // this before members
      dispatch(channels.fetched(args.channels));
      dispatch(members.fetched(args.members));
      dispatch(roles.fetched(args.roles)); // this after members
      dispatch(guilds.created(args));
      dispatch(
        uiActions.openModal({
          content: "Create guild successfully!",
          variant: "info",
        })
      );
      // history.push(`/channels/${args.guild.id}`);
    });
    ws.on("GUILD_DELETE", (args) => {
      const { ui } = state;
      const guildIsActive = args.guildId === ui.activeGuild?.id;
      if (guildIsActive) {
        dispatch(uiActions.closeModal());
        // history.push('/channels/@me');
      }
      dispatch(guilds.deleted(args));
      // clean up leaving guild mess
      const memberId = getSelfMember(args.guildId)(state)!.id;
      dispatch(members.removed({ memberId }));
    });
    // listen to passive events (not received by api middleware)
    ws.on("GUILD_MEMBER_ADD", (args) => {
      // we not getting other users when joining guild
      dispatch(users.fetched([args.user]));
      dispatch(members.added(args));
    });
    ws.on("GUILD_MEMBER_UPDATE", (args) => dispatch(members.updated(args)));
    // user may be in mutual guilds, and therefore not removed from global user cache
    ws.on("GUILD_MEMBER_REMOVE", (args) => dispatch(members.removed(args)));
    ws.on("GUILD_ROLE_CREATE", (args) => {
      dispatch(roles.created(args));
      enqueueSnackbar(
        `Role ${args.role.name} in guild ${args.guildId} created`,
        {
          variant: "info",
        }
      );
    });
    ws.on("GUILD_ROLE_DELETE", (args) => dispatch(roles.deleted(args)));
    ws.on("GUILD_ROLE_UPDATE", (args) => dispatch(roles.updated(args)));
    ws.on("GUILD_UPDATE", (args) => dispatch(guilds.updated(args)));
    ws.on("INVITE_CREATE", (args) => {
      dispatch(invites.created(args));
      dispatch(uiActions.focusedInvite(args.invite));
    });
    ws.on("INVITE_DELETE", (args) => dispatch(invites.deleted(args)));
    ws.on("MESSAGE_CREATE", (args) => {
      console.log("message create");
      dispatch(messages.created(args));
      //@ts-ignore
      dispatch(pingWhenNotInChannel(args.message.channelId));
    });
    ws.on("DM_CHANNEL_CREATE", (args) => {
      // const { dmChannel } = args;
      dispatch(dmChannels.created(args));
    });
    ws.on("DM_MESSAGE_CREATE", (args) => {
      const { message } = args;
      dispatch(messages.created({ message }));
      //@ts-ignore
      dispatch(pingWhenNotInDMChannel(args.message.channelId));
    });
    ws.on("MESSAGE_DELETE", (args) => dispatch(messages.deleted(args)));
    ws.on("MESSAGE_UPDATE", (args) => dispatch(messages.updated(args)));
    ws.on("PRESENCE_UPDATE", ({ userId, status }) =>
      dispatch(users.updated({ userId, partialUser: { status } }))
    );
    ws.on("READY", (args) => {
      // dispatch(fetchEntities());
      console.log("ready");
      dispatch(auth.ready(args));
      dispatch(users.fetched([args.user]));
    });
    ws.on("TYPING_START", (args) => {
      dispatch(typing.userTyped(args));

      const timeoutMs = 5000;
      setTimeout(() => dispatch(typing.userStoppedTyping(args)), timeoutMs);
    });
    ws.on("USER_DELETE", () => {
      ws.disconnect();
      // history.push('/');
      // @ts-ignore
      dispatch(logoutUser());
    });
    ws.on("USER_UPDATE", (args) => {
      console.log("user updated");
      dispatch(auth.updatedUser(args));
      dispatch(users.updated(args));
    });
    ws.on("VOICE_STATE_UPDATE", async ({ userId, voice }) => {
      const data = { userId, partialUser: { voice } };
      dispatch(users.updated(data));

      voice
        ? // if in channel
          await startVoiceFeedback(voice)
        : stopVoiceFeedback();
    });

    dispatch(meta.listenedToWS());
  }, [hasListened]);

  return null;
};

export default WSListener;
