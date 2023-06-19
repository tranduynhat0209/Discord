import { useState } from "react";
import Plus from "../../../../assets/image/home/Plus.png";
import Discovery from "../../../../assets/image/home/Discovery.png";
import { Link } from "react-router-dom";
import AddNewServer from "../AddNewServer/AddNewServer";
import { Dialog, Tooltip } from "@mui/material";
import JoinNewServer from "../AddNewServer/JoinNewServer";
import defaultIcon from "../../../../assets/image/home/pngfind.com-discord-icon-png-1187431.png";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import "./HomeIcon.scss";

export default function ServerList() {
  const [newDialogIsOpen, setNewDialogIsOpen] = useState<boolean>(false);
  const [openJoinChannel, setOpenJoinChannel] = useState<boolean>(false);
  const guilds = useSelector((state: AppState) => state.entities.guilds);
  const [chosenGuild, setChosenGuild] = useState<string>();
  const pings = useSelector((state: AppState) => state.entities.pings);
  return (
    <nav className="home">
      <div onClick={() => setChosenGuild("dm")}>
        <Link to="/main/direct-message">
          <div
            className={chosenGuild === "dm" ? "main-active-logo" : "main-logo"}
          >
            <img src={defaultIcon} alt="logo" />
            {pings["DM"]?.length > 0 && <div className="ping"></div>}
          </div>
        </Link>
      </div>
      <span className="line"></span>

      <ul className="list-avatar">
        {guilds?.length > 0 &&
          guilds.map(
            (guild) =>
              guild && (
                <div onClick={() => setChosenGuild(guild.id)}>
                  <Tooltip
                    title={
                      <p
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        {" "}
                        {guild.name}{" "}
                      </p>
                    }
                    placement="right"
                    arrow
                  >
                    <Link to={"/main/guild-details/" + guild.id + "/channels"}>
                      {" "}
                      {guild.iconURL ? (
                        <div className="guild-container">
                          <img
                            className={
                              chosenGuild === guild.id
                                ? "guild-active-image"
                                : "guild-image"
                            }
                            src={`${process.env.REACT_APP_CDN_URL}${guild.iconURL}`}
                            alt="logo"
                          />
                          {pings[guild.id]?.length > 0 && (
                            <div className="ping"></div>
                          )}
                        </div>
                      ) : (
                        <div
                          className={
                            chosenGuild === guild.id
                              ? "main-active-logo"
                              : "main-logo"
                          }
                        >
                          <img src={defaultIcon} alt="logo" />
                          {pings[guild.id]?.length > 0 && (
                            <div className="ping"></div>
                          )}
                        </div>
                      )}
                    </Link>
                  </Tooltip>
                </div>
              )
          )}

        <span className="line"></span>
        <li
          className="add-server plus cover"
          onClick={() => {
            setNewDialogIsOpen(true);
          }}
        >
          <img src={Plus} alt="Add server" />
        </li>
        <li
          className="add-server plus cover"
          onClick={() => {
            setOpenJoinChannel(true);
          }}
        >
          <img src={Discovery} alt="Add server" />
        </li>

        <Dialog
          open={newDialogIsOpen}
          onClose={() => setNewDialogIsOpen(false)}
        >
          <AddNewServer handleClose={() => setNewDialogIsOpen(false)} />
        </Dialog>

        <Dialog
          open={openJoinChannel}
          onClose={() => setOpenJoinChannel(false)}
        >
          <JoinNewServer handleClose={() => setOpenJoinChannel(false)} />
        </Dialog>
      </ul>
    </nav>
  );
}
