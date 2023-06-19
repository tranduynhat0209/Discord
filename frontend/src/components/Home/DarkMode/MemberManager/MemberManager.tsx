import { Box, Dialog, Divider, List, ListItem } from "@mui/material";
import "./MemberManager.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store";
import {
  getGuildMembers,
  getGuildUsers,
  isOwner,
} from "../../../../store/guilds";
import { Add, Expand } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MemberDialog from "./MemberDialog";
import { createRole, getSelfPermission } from "../../../../store/roles";
import { hasPerm } from "../../../../services/perm-service";

export default function MemberManager() {
  const ui = useSelector((state: AppState) => state.ui!);
  const guildId = ui.activeGuild!.id;
  const users = useSelector(getGuildUsers(guildId));
  const members = useSelector(getGuildMembers(guildId));
  const dispatch = useDispatch();
  const owner = useSelector(isOwner(guildId));
  const userPermission = useSelector(getSelfPermission(guildId));
  const canManageMembers = owner || hasPerm(userPermission, "MANAGE_GUILD");

  const [selectedMemberId, setSelectedMemberId] = useState<
    string | undefined
  >();
  return (
    <div className="main-role">
      <header className="main-role-header">
        <p className="title">Member Management</p>
      </header>
      <main className="main-role-container">
        <List sx={{ width: "100%", maxHeight: "80vh", overflow: "auto" }}>
          {members &&
            members.length > 0 &&
            members.map((member) => {
              const user = users?.find((u) => u.id === member?.userId);
              return (
                <ListItem key={member?.id}>
                  <div
                    className="role-item"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setSelectedMemberId(member?.id);
                    }}
                  >
                    <Box display="flex">
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                        src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
                      />
                      <p
                        style={{
                          marginLeft: "5px",
                          display: "flex",
                          color: "white",
                          alignItems: "center",
                          fontWeight: 600,
                        }}
                      >
                        {user.username}
                      </p>
                    </Box>
                    <p style={{ color: "white" }}>See details</p>
                  </div>
                </ListItem>
              );
            })}
        </List>
      </main>
      {
        <Dialog
          open={selectedMemberId !== undefined}
          onClose={() => setSelectedMemberId(undefined)}
        >
          <MemberDialog
            handleClose={() => setSelectedMemberId(undefined)}
            memberId={selectedMemberId}
          />
        </Dialog>
      }
    </div>
  );
}
