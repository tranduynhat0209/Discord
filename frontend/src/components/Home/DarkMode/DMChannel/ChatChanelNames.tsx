import { NavLink, useParams } from "react-router-dom";
import "./ChatChanelNames.scss";
import { useDispatch, useSelector } from "react-redux";
import { getGuildChannels } from "../../../../store/guilds";
import { Box, Divider, List, ListItem } from "@mui/material";
import { useState } from "react";
import { AppState } from "../../../../store";
import { actions } from "../../../../store/ui";
import { actions as pings } from "../../../../store/pings";

export const Users: React.FunctionComponent = () => {
  const users = useSelector((state: AppState) => state.entities.users);
  const self = useSelector((state: AppState) => state.auth.user!);
  const [searchingText, setSearchingText] = useState<string | undefined>();
  return (
    <div>
      <div>
        <h6>Search</h6>
        <input
          type="text"
          onChange={(e) => {
            setSearchingText(e.target.value);
          }}
        />
      </div>

      <div>
        {users &&
          users
            .filter(
              (u) =>
                searchingText &&
                searchingText.length > 0 &&
                u.username
                  .toLowerCase()
                  .includes(searchingText.toLowerCase()) &&
                u.id !== self.id
            )
            .map((user) => (
              <NavLink to={"/dm/" + user.id}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                  src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
                />
                <h6>{user.username}</h6>
              </NavLink>
            ))}
      </div>
    </div>
  );
};

export default function ChatChanelNames() {
  const users = useSelector((state: AppState) => state.entities.users);
  const self = useSelector((state: AppState) => state.auth.user!);
  const [searchingText, setSearchingText] = useState<string>("");
  const activeUser = useSelector((state: AppState) => state.ui.activeUser);
  const ping = useSelector((state: AppState) => state.entities.pings);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        padding: "5px",
      }}
    >
      <h3
        style={{
          color: "white",
          margin: "5px",
        }}
      >
        Direct Messages
      </h3>

      <Box>
        <input
          type="text"
          placeholder="Search users"
          onChange={(e) => setSearchingText(e.target.value)}
          value={searchingText}
          style={{
            marginLeft: "5px",
            marginTop: "5px",
            padding: "3px",
            borderRadius: "4px",
            backgroundColor: "#383a40",
            border: "none",
            outline: "none",
            fontSize: "16px",
            lineHeight: "20px",
            color: "white",
            height: "30px",
          }}
        />
      </Box>

      <Divider
        sx={{
          backgroundColor: "grey",
          marginTop: "20px",
        }}
      />

      <List sx={{ width: "100%", height: "70vh", overflow: "auto" }}>
        {users &&
          users.length > 0 &&
          users
            .filter(
              (u) =>
                u.username
                  .toLowerCase()
                  .includes(searchingText.toLowerCase()) && u.id !== self?.id
            )
            .map((user) => (
              <ListItem key={user.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Box
                    display="flex"
                    onClick={() => {
                      dispatch(actions.focusedUser(user));
                      dispatch(
                        pings.channelMarkedAsRead({
                          guildId: "DM",
                          channelId: user.id,
                        })
                      );
                    }}
                  >
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                      src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
                    />
                    <p
                      className={
                        activeUser?.id === user.id ? "active-title" : "title"
                      }
                    >
                      {user.username}
                    </p>
                  </Box>
                  {ping["DM"]?.length > 0 && ping["DM"]?.includes(user.id) && (
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
              </ListItem>
            ))}
      </List>
    </Box>
  );
}
