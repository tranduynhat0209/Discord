import SidebarMenuGroup from "./SidebarMenuGroup";
import "./SideBarMenu.scss";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSelfPermission } from "../../../../store/roles";
import { isOwner } from "../../../../store/guilds";
import { hasPerm } from "../../../../services/perm-service";
import { useState } from "react";
import AddNewServer from "../AddNewServer/AddNewServer";
import { Dialog, DialogTitle } from "@mui/material";
import { createInvite } from "../../../../store/invites";
import { AppState } from "../../../../store";
import { actions } from "../../../../store/ui";
import AddNewChannel from "../AddNewServer/AddNewChannel";
export default function SideBarMenu() {
  const { guildId } = useParams();
  const totalPermission = useSelector(getSelfPermission(guildId));
  const owner = useSelector(isOwner(guildId));
  const self = useSelector((state: AppState) => state.auth.user);
  const dispatch = useDispatch();
  const focusedInvite = useSelector((state: AppState) => state.ui.activeInvite);
  const [opening, setOpening] = useState<number>(0);
  return (
    <>
      <div className="sidebar-menu">
        {(owner || hasPerm(totalPermission, "MANAGE_GUILD")) && (
          <>
            <div onClick={() => setOpening(1)}>
              <SidebarMenuGroup
                titles={["Update Server Information"]}
                activeDefault={[false]}
              />
            </div>
            <div className="line"></div>
          </>
        )}
        {(owner || hasPerm(totalPermission, "MANAGE_CHANNELS")) && (
          <>
            <div onClick={() => setOpening(2)}>
              <SidebarMenuGroup
                titles={["Add Channel"]}
                activeDefault={[false]}
              />
            </div>
            <div className="line"></div>
          </>
        )}
        {(owner || hasPerm(totalPermission, "MANAGE_ROLES")) && (
          <Link to={`/main/guild-details/${guildId}/roles`}>
            <SidebarMenuGroup
              titles={["Manage Roles"]}
              activeDefault={[false]}
            />
            <div className="line"></div>
          </Link>
        )}

        <Link to={`/main/guild-details/${guildId}/members`}>
          <SidebarMenuGroup
            titles={["Manage Members"]}
            activeDefault={[false]}
          />
          <div className="line"></div>
        </Link>

        {(owner || hasPerm(totalPermission, "MANAGE_INVITES")) && (
          <>
            <SidebarMenuGroup
              titles={["Manage Invatations"]}
              activeDefault={[false]}
            />
            <div className="line"></div>
          </>
        )}
        {(owner || hasPerm(totalPermission, "CREATE_INVITE")) && (
          <>
            <div
              onClick={() => {
                // @ts-ignore
                dispatch(createInvite(guildId));
              }}
            >
              <SidebarMenuGroup
                titles={["Generate Invatation"]}
                activeDefault={[false]}
              />
            </div>
            <div className="line"></div>
          </>
        )}
        {!owner && (
          <>
            <SidebarMenuGroup
              titles={["Leave Server"]}
              activeDefault={[false]}
            />
            <div className="line"></div>
          </>
        )}
      </div>

      <Dialog open={opening === 1} onClose={() => setOpening(0)}>
        <AddNewServer handleClose={() => setOpening(0)} guildId={guildId} />
      </Dialog>

      <Dialog open={opening === 2} onClose={() => setOpening(0)}>
        <AddNewChannel handleClose={() => setOpening(0)} guildId={guildId} />
      </Dialog>

      <Dialog
        open={
          focusedInvite !== undefined && focusedInvite.inviterId === self.id
        }
        onClose={() => dispatch(actions.unfocusedInvite())}
      >
        <DialogTitle>
          Your Invitation Code: <b>{focusedInvite?.inviteCode}</b>
        </DialogTitle>
      </Dialog>
    </>
  );
}
