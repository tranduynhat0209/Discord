import { useDispatch, useSelector } from "react-redux";
import {
  createRole,
  deleteRole,
  getRole,
  getSelfPermission,
  updateRole,
} from "../../store/roles";
import { getGuildRoles, isOwner } from "../../store/guilds";
import { hasPerm } from "../../services/perm-service";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PermissionTypes } from "../../types";

export const Role: React.FunctionComponent<{
  guildId: string;
  roleId: string;
}> = ({ guildId, roleId }) => {
  const role = useSelector(getRole(roleId));
  const owner = useSelector(isOwner(guildId));
  const userPermission = useSelector(getSelfPermission(guildId));
  const canManageRoles = owner || hasPerm(userPermission, "MANAGE_ROLES");
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const [newName, setNewName] = useState<string>("");
  const [newPermission, setNewPermission] = useState<number>(0);
  return (
    role && (
      <div>
        <div
          style={{
            margin: "5px",
          }}
        >
          {JSON.stringify(role)}
          {canManageRoles && role.name !== "@everyone" && (
            <div>
              {!isUpdating ? (
                <button
                  onClick={() => {
                    setIsUpdating(true);
                  }}
                >
                  Update
                </button>
              ) : (
                <div>
                  <div>
                    {Object.keys(PermissionTypes.Permission)
                      .slice(Object.keys(PermissionTypes.Permission).length / 2)
                      .map((k) => {
                        return (
                          <div>
                            {k}:
                            <input
                              type="checkbox"
                              defaultChecked={
                                (role.permissions &
                                  PermissionTypes.Permission[k]) ===
                                1
                              }
                              onChange={() => {
                                setNewPermission((prev) => {
                                  const cur =
                                    prev ^ PermissionTypes.Permission[k];
                                  console.log(cur.toString(2));
                                  return cur;
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => {
                      dispatch(
                        // @ts-ignore
                        updateRole(guildId, roleId, {
                          permissions: newPermission,
                          name: newName,
                        })
                      );
                      setNewName("");
                      setNewPermission(0);
                      setIsUpdating(false);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => {
                      setNewName("");
                      setNewPermission(0);
                      setIsUpdating(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() =>
                  //@ts-ignore
                  dispatch(deleteRole(guildId, roleId))
                }
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
};
export const Roles: React.FunctionComponent = () => {
  const { guildId } = useParams();
  const roles = useSelector(getGuildRoles(guildId));
  const userPermission = useSelector(getSelfPermission(guildId));
  const owner = useSelector(isOwner(guildId));
  const canManageRoles = owner || hasPerm(userPermission, "MANAGE_ROLES");
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <h3>Roles</h3>
        {roles &&
          roles.map((role) => (
            <Role guildId={guildId} roleId={role.id} key={role.id} />
          ))}
      </div>
      {canManageRoles && (
        <div>
          <button
            onClick={() =>
              // @ts-ignore
              dispatch(createRole(guildId))
            }
          >
            Add New Role
          </button>
        </div>
      )}
    </div>
  );
};
