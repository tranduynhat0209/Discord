import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, List, ListItem } from "@mui/material";
import "./RoleDialog.scss";
import {
  deleteRole,
  getRole,
  getSelfPermission,
  updateRole,
} from "../../../../store/roles";
import { isOwner } from "../../../../store/guilds";
import { hasPerm } from "../../../../services/perm-service";
import { PermissionTypes } from "../../../../types";
import { AppState } from "../../../../store";
const RoleDialog: React.FunctionComponent<{ handleClose; roleId: string }> = ({
  handleClose,
  roleId,
}) => {
  const ui = useSelector((state: AppState) => state.ui!);
  const guildId = ui.activeGuild!.id;
  const role = useSelector(getRole(roleId));
  const owner = useSelector(isOwner(guildId));
  const userPermission = useSelector(getSelfPermission(guildId));
  const canManageRoles = owner || hasPerm(userPermission, "MANAGE_ROLES");
  const [newName, setNewName] = useState<string>(role?.name);
  const [newPermission, setNewPermission] = useState<number>(
    role ? role.permissions : 0
  );
  console.log(role?.permissions?.toString(2));
  const keys = Object.keys(PermissionTypes.Permission).slice(
    Object.keys(PermissionTypes.Permission).length / 2
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
        <h2>Customize {role?.name}</h2>
      </Box>

      <List sx={{ width: "100%", maxHeight: "600px", overflow: "auto" }}>
        {keys.map((k) => {
          return (
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
                {k}
                <Checkbox
                    disabled={
                      !canManageRoles || !role || role.name === "@everyone"
                    }
                    defaultChecked={
                      role &&
                      (role.permissions & PermissionTypes.Permission[k]) > 0
                    }
                    onChange={() => {
                      setNewPermission((prev) => {
                        const cur = prev ^ PermissionTypes.Permission[k];
                        console.log(cur.toString(2));
                        return cur;
                      });
                    }}
                  />
              </Box>
            </ListItem>
          );
        })}
      </List>
      {
        <form
          style={{
            marginTop: "20px",
          }}
        >
          <label
            htmlFor="input-name"
            style={{
              alignSelf: "baseline",
              marginBottom: "8px",
              fontSize: "12px",
              lineHeight: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "#4e5058",
              marginRight: "5px",
            }}
          >
            Role Name:
          </label>
          <input
            disabled={!canManageRoles || !role || role.name === "@everyone"}
            type="text"
            id="input-name"
            defaultValue={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              height: "40px",
              padding: "10px",
              outline: "none",
              border: "none",
              backgroundColor: "#e3e5e8",
              borderRadius: "3px",
              fontSize: "16px",
            }}
          />
        </form>
      }
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
          disabled={!canManageRoles || !role || role.name === "@everyone"}
          onClick={() => {
            dispatch(
              //@ts-ignore
              deleteRole(guildId, roleId)
            );
            handleClose();
          }}
        >
          Delete Role
        </button>
        <button
          className="update-role"
          disabled={
            !canManageRoles ||
            !role ||
            role.name === "@everyone" ||
            newName === "@everyone"
          }
          onClick={() => {
            dispatch(
              //@ts-ignore
              updateRole(guildId, roleId, {
                name: newName,
                permissions: newPermission,
              })
            );
            handleClose();
          }}
        >
          Update Role
        </button>
      </Box>
    </Box>
  );
};

export default RoleDialog;
