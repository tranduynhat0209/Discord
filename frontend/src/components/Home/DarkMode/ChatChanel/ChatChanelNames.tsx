import "./ChatChanelNames.scss";
import { useDispatch, useSelector } from "react-redux";
import { getGuildChannels } from "../../../../store/guilds";
import { Box, Divider } from "@mui/material";
import { ChannelTypes } from "../../../../types";
import { useState } from "react";
import { AppState } from "../../../../store";
import { actions } from "../../../../store/ui";
import { actions as pings } from "../../../../store/pings";
import {
  joinVoiceChannel,
  leaveVoiceChannel,
} from "../../../../store/channels";

export default function ChatChanelNames() {
  const ui = useSelector((state: AppState) => state.ui!);
  const guildId = ui.activeGuild!.id;
  const channels = useSelector(getGuildChannels(guildId));
  const ping = useSelector((state: AppState) => state.entities.pings);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        padding: "5px",
      }}
    >
      <Box>
        <h3
          style={{
            color: "white",
            margin: "5px",
          }}
        >
          Text Channels
        </h3>

        {channels &&
          channels.length > 0 &&
          channels
            .filter((channel) => channel.type === "TEXT")
            .map((channel) => (
              <Box
                className="chat-chanel-name"
                onClick={() => {
                  dispatch(actions.focusedChannel(channel));
                  dispatch(
                    pings.channelMarkedAsRead({
                      channelId: channel.id,
                      guildId,
                    })
                  );
                }}
              >
                <p
                  className={
                    ui.activeChannel?.id === channel.id
                      ? "active-title"
                      : "title"
                  }
                >
                  {channel.name}
                </p>
                {ping[guildId]?.length > 0 &&
                  ping[guildId]?.includes(channel.id) && (
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                      }}
                    ></div>
                  )}
              </Box>
            ))}
      </Box>
      <Divider
        sx={{
          backgroundColor: "grey",
          my: "20px",
        }}
      />
      <Box>
        <h3
          style={{
            color: "white",
            margin: "5px",
          }}
        >
          Voice Channels
        </h3>

        {channels &&
          channels.length > 0 &&
          channels
            .filter((channel) => channel.type === "VOICE")
            .map((channel) => (
              <Box
                className="chat-chanel-name"
                onClick={
                  ui.activeChannel?.id !== channel.id
                    ? () => {
                        // @ts-ignore
                        dispatch(joinVoiceChannel(channel.id));
                        dispatch(actions.focusedChannel(channel));
                      }
                    : () => {
                        // @ts-ignore
                        dispatch(leaveVoiceChannel(channel.id));
                        dispatch(actions.unfocusedChannel());
                      }
                }
              >
                <p
                  className={
                    ui.activeChannel?.id === channel.id ? "active-title" : "title"
                  }
                >
                  {channel.name}
                </p>
              </Box>
            ))}
      </Box>
    </Box>
  );
}
