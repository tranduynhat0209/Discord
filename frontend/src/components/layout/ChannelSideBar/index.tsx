import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Divider, List, Typography } from "@mui/material";
import discordIcon from "../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";
import plusIcon from "../../../assets/image/home/Plus.png";
import { NavLink, useLocation } from "react-router-dom";
import { SwipeableDrawer } from "@mui/material";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import guilds, { getGuild } from "../../../store/guilds";
import "./SideBar.scss";

const GuildAvatar: React.FunctionComponent<{ guildId: string }> = ({
  guildId,
}) => {
  const guild = useSelector(getGuild(guildId));
  return (
    <Box
      // className={"guild-logo"}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        py: 1,
      }}
    >
      <Box className={"guild-logo"}>
        <img
          src={guild?.iconURL ?? discordIcon}
          alt={"discord"}
          style={{
            opacity: 1,
          }}
        />
      </Box>
    </Box>
  );
};
const ChannelSideBar = () => {
  const users = useSelector((state: AppState) => state.entities.users);
  const self = useSelector((state: AppState) => state.auth.user!);
  const [searchingText, setSearchingText] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const popUpMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
    });
  };
  return (
    <>
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          backgroundColor: "#151617",
        }}
      >
        <Box
          // className={"guild-logo"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        ></Box>
        <Divider
          variant="middle"
          style={{
            backgroundColor: "white",
          }}
        />
        <List>
          {users &&
            users
              .filter(
                (u) =>
                  u.username
                    .toLowerCase()
                    .includes(searchingText.toLowerCase()) && u.id !== self.id
              )
              .map((user) => (
                <Box
                  className={"user-item"}
                  sx={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginLeft: "15px",
                    }}
                    src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
                  />
                  <p
                    style={{
                      color: "white",
                      marginLeft: "10px",
                      fontSize: "20px",
                    }}
                  >
                    {user.username}
                  </p>
                </Box>
              ))}
        </List>
      </Box>
    </>
  );
};
export default ChannelSideBar;
