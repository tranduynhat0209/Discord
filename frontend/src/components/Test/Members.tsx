import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuild,
  getGuildMembers,
  getGuildRoles,
  getGuildUsers,
  isOwner,
} from "../../store/guilds";
import { Entity } from "../../types";
import { getRoles, getSelfPermission } from "../../store/roles";
import { useParams } from "react-router-dom";
import { hasPerm } from "../../services/perm-service";
import { updateMember } from "../../store/members";

export const Member: React.FunctionComponent<{
  member: Entity.GuildMember;
  user: Entity.User;
}> = ({ member, user }) => {
  const userPermission = useSelector(getSelfPermission(member.guildId));
  const guild = useSelector(getGuild(member.guildId));
  const isSelfOwner = useSelector(isOwner(member.guildId));
  const isUserOwner = user.id === guild.id;
  const canManageRoles = isSelfOwner || hasPerm(userPermission, "MANAGE_ROLES");
  const currentRoles = useSelector(getRoles(member.roleIds));
  const allRoles = useSelector(getGuildRoles(member.guildId));
  const [isModifying, setModifying] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [roleList, setRoleList] = useState<string[]>(
    currentRoles.map((r) => r.id)
  );

  return (
    <div>
      <h3>
        {user.username} {isUserOwner && "(Owner)"}
      </h3>
      <h4>Roles</h4>
      <div>
        {currentRoles &&
          currentRoles.map((role) => (
            <div
              key={role.id}
              style={{
                margin: "5px",
              }}
            >
              <h6>{role.name}</h6>
            </div>
          ))}
      </div>

      <div>
        {canManageRoles && !isModifying && (
          <button onClick={() => setModifying(true)}>Modify</button>
        )}

        {canManageRoles && isModifying && (
          <div>
            {allRoles
              .filter((role) => role.name !== "@everyone")
              .map((role) => (
                <div
                  style={{
                    margin: "5px",
                  }}
                >
                  <p>
                    {role.name}-{role.id}
                    <input
                      type="checkbox"
                      defaultChecked={currentRoles.includes(role)}
                      onChange={(e) => {
                        e.preventDefault();
                        if (e.target.checked) {
                          setRoleList((prev) => {
                            const index = prev.indexOf(role.id);
                            if (index === -1) prev.push(role.id);
                            return prev;
                          });
                        } else {
                          setRoleList((prev) => {
                            const index = prev.indexOf(role.id);
                            if (index !== -1) prev = prev.splice(index, 1);
                            return prev;
                          });
                        }
                      }}
                    />
                  </p>
                </div>
              ))}
            <button
              onClick={() =>
                dispatch(
                  //@ts-ignore
                  updateMember(member.id, {
                    roleIds: roleList,
                  })
                )
              }
            >
              Update
            </button>
          </div>
        )}

        {canManageRoles && isModifying && (
          <button onClick={() => setModifying(false)}>Cancel</button>
        )}
      </div>
    </div>
  );
};

export const Members: React.FunctionComponent = () => {
  const { guildId } = useParams();
  const users = useSelector(getGuildUsers(guildId));
  const members = useSelector(getGuildMembers(guildId));
  const [chosenMember, setChosenMember] = useState<string | undefined>();
  return (
    <div>
      <h3>Members</h3>
      {users &&
        users.map((user) => (
          <div
            style={{
              margin: "5px",
            }}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
              src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
            />
            <h6>
              {user.username}#{user.discriminator}
            </h6>
            {chosenMember !== user.id ? (
              <button
                onClick={() => {
                  setChosenMember(user.id);
                }}
              >
                See roles
              </button>
            ) : (
              <button
                onClick={() => {
                  setChosenMember(undefined);
                }}
              >
                Cancel
              </button>
            )}
            {chosenMember === user.id && (
              <Member
                user={user}
                member={members.find((m) => m.userId === user.id)}
              />
            )}
          </div>
        ))}
    </div>
  );
};
