import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, List, ListItem } from "@mui/material";
import "./MemberDialog.scss";
import {
  createRole,
  deleteRole,
  getRole,
  getSelfPermission,
  updateRole,
} from "../../../../store/roles";
import { getGuildRoles, isOwner } from "../../../../store/guilds";
import { hasPerm } from "../../../../services/perm-service";
import { useParams } from "react-router-dom";
import { PermissionTypes } from "../../../../types";
import { CheckBox } from "@mui/icons-material";
import {
  getMember,
  getMemberById,
  kickMember,
  updateMember,
} from "../../../../store/members";
import { AppState } from "../../../../store";
const MemberDialog: React.FunctionComponent<{
  handleClose;
  memberId: string;
}> = ({ handleClose, memberId }) => {
  const ui = useSelector((state: AppState) => state.ui!);
  const guildId = ui.activeGuild!.id;
  const member = useSelector(getMemberById(memberId));
  const user = useSelector((state: AppState) =>
    state.entities.users.find((u) => u.id === member?.userId)
  );
  const owner = useSelector(isOwner(guildId));
  const roles = useSelector(getGuildRoles(guildId));
  const userPermission = useSelector(getSelfPermission(guildId));
  const canManageRoles = owner || hasPerm(userPermission, "MANAGE_ROLES");
  const canKickMembers = owner || hasPerm(userPermission, "KICK_MEMBERS");
  let defaultRoleIds: { [key: string]: boolean } = {};
  if (roles?.length > 0 && member?.roleIds?.length > 0) {
    member.roleIds.map((roleId) => {
      if (roleId && roles?.find((r) => r.id === roleId) !== undefined)
        defaultRoleIds[`${roleId}`] = true;
    });
  }
  const [memberRoles, setMemberRoles] = useState<{ [key: string]: boolean }>(
    defaultRoleIds
  );
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",
        width: "500px",
        maxHeight: "1000px",
        minHeight: "200px",
        borderRadius: "4px",
        py: "20px",
      }}
    >
      <CloseIcon
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        onClick={() => {
          console.log("alo");
          handleClose();
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <h2>Customize {user?.username}</h2>
      </Box>

      <List sx={{ width: "100%", maxHeight: "600px", overflow: "auto" }}>
        {roles &&
          roles.length > 0 &&
          roles.map((role) => {
            return (
              role && (
                <ListItem>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      px: "10px",
                      py: "5px",
                    }}
                  >
                    {role.name}
                    <Checkbox
                      disabled={!canManageRoles || role.name === "@everyone"}
                      defaultChecked={defaultRoleIds[`${role.id}`] === true}
                      onChange={() => {
                        setMemberRoles((prev) => {
                          if (prev[`${role.id}`]) {
                            prev[`${role.id}`] = false;
                          } else {
                            prev[`${role.id}`] = true;
                          }
                          return prev;
                        });
                      }}
                    />
                  </Box>
                </ListItem>
              )
            );
          })}
      </List>

      <Box
        sx={{
          width: "90%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <button
          className="delete-role"
          disabled={!canKickMembers || !member}
          onClick={() => {
            dispatch(
              //@ts-ignore
              kickMember(member.guildId, member.userId)
            );
            handleClose();
          }}
        >
          Kick Member
        </button>
        <button
          className="update-role"
          disabled={!canManageRoles || !member}
          onClick={() => {
            const newRoleIds = Object.entries(memberRoles).reduce(
              (ids, [k, v]) => {
                return v ? [...ids, k] : ids;
              },
              []
            );

            dispatch(
              //@ts-ignore
              updateMember(memberId, {
                roleIds: newRoleIds,
              })
            );
            handleClose();
          }}
        >
          Update Member
        </button>
      </Box>
    </Box>
  );
};

export default MemberDialog;
