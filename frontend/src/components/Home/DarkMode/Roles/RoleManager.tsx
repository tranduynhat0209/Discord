import { Box, Dialog, Divider, List, ListItem } from "@mui/material";
import "./RoleManager.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { getGuildRoles, isOwner } from "../../../../store/guilds";
import { Add, Expand } from "@mui/icons-material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RoleDialog from "./RoleDialog";
import { createRole, getSelfPermission } from "../../../../store/roles";
import { hasPerm } from "../../../../services/perm-service";

export default function RoleManager() {
  const { guildId } = useParams();
  const roles = useSelector(getGuildRoles(guildId));
  const dispatch = useDispatch();
  const owner = useSelector(isOwner(guildId));
  const userPermission = useSelector(getSelfPermission(guildId));
  const canManageRoles = owner || hasPerm(userPermission, "MANAGE_ROLES");
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>();
  return (
    <div className="main-role">
      <header className="main-role-header">
        <p className="title">Role Configuration</p>
        {canManageRoles && (
          <Add
            sx={{
              backgroundColor: "white",
            }}
            onClick={() => {
              dispatch(
                // @ts-ignore
                createRole(guildId)
              );
            }}
          />
        )}
      </header>
      <main className="main-role-container">
        <List sx={{ width: "100%", maxHeight: "80vh", overflow: "auto" }}>
          {roles &&
            roles.length > 0 &&
            roles.map((role) => (
              <ListItem key={role?.id}>
                <div
                  className="role-item"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setSelectedRoleId(role?.id);
                  }}
                >
                  <h3 style={{ color: "white" }}>{role.name}</h3>
                  <p style={{ color: "white" }}>See details</p>
                </div>
              </ListItem>
            ))}
        </List>
      </main>
      {
        <Dialog
          open={selectedRoleId !== undefined}
          onClose={() => setSelectedRoleId(undefined)}
        >
          <RoleDialog
            handleClose={() => setSelectedRoleId(undefined)}
            roleId={selectedRoleId}
          />
        </Dialog>
      }
    </div>
  );
}
