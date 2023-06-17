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
const SideBar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const currentRoute = useLocation();

  const guildIds = useSelector((state: AppState) => state.auth.user?.guildIds);

  const { enqueueSnackbar } = useSnackbar();

  const popUpMessage = (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
    });
  };
  return (
    <>
      <SwipeableDrawer
        ModalProps={{
          keepMounted: true,
        }}
        anchor="left"
        open={open}
        variant={"persistent"}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        className={"bar"}
        sx={{
          width: "90px",
          minHeight: "100vh",
          "& .MuiDrawer-paper": {
            width: "90px",
            backgroundColor: "#202225",
            boxSizing: "border-box",
            border: "none",
          },
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
        >
          <Box className={"guild-logo"}>
            <img
              src={discordIcon}
              alt={"discord"}
              style={{
                opacity: 1,
              }}
            />
          </Box>
        </Box>
        <Divider
          variant="middle"
          style={{
            backgroundColor: "white",
          }}
        />
        <List>
          {guildIds &&
            guildIds.map(
              (guildId) => guildId && <GuildAvatar guildId={guildId} />
            )}
        </List>
        <Divider
          variant="middle"
          style={{
            backgroundColor: "white",
          }}
        />
        <Box
          // className={"guild-logo"}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Box className={"guild-logo"}>
            <img
              src={plusIcon}
              alt={"Add"}
              style={{
                opacity: 1,
                width: "20px",
                height: "20px",
              }}
            />
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
export default SideBar;
