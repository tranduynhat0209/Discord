import { Entity, PermissionTypes } from "../types";

export const PermDescription = {
  ADMINISTRATOR: `Gives all permissions. This is a dangerous permission.`,
  CREATE_INVITE: "Ability to create invites for users to join this guild.",
  KICK_MEMBERS: "Ability to kick members from this guild.",
  MANAGE_CHANNELS: "Ability to create, edit, or delete channels.",
  MANAGE_GUILD: `Ability to edit general guild settings.`,
  MANAGE_ROLES: "Ability to create, update, and delete guild roles.",
  VIEW_CHANNELS: "Ability to view channels.",
  MANAGE_INVITES: "Ability to delete invites.",
  SEND_MESSAGES: "Ability to send messages in text channels.",
  MANAGE_MESSAGES: `Ability to manage message other member's messages.`,
  READ_MESSAGES: `Ability to read messages,`,
  SEND_FILES: `Ability to send files or images in messages.`,
  CONNECT: `Ability to connect to the voice channels`,
};

export function canMember(
  permission: PermissionTypes.PermissionString,
  guild: Entity.Guild,
  member: Entity.GuildMember
) {
  return (
    guild.ownerId === member.userId ||
    this.hasPerm(
      this.getTotalPerms(member, guild.id),
      PermissionTypes.Permission[permission] as number
    )
  );
}

export function hasPerm(
  totalPerms: number,
  permission: PermissionTypes.PermissionString
) {
  return (
    Boolean(totalPerms & PermissionTypes.Permission[permission]) ||
    Boolean(totalPerms & PermissionTypes.Permission.ADMINISTRATOR)
  );
}

export function getHighestRole(roles: Entity.Role[]) {
  const max = (key: string) => (max, val) => max[key] > val[key] ? max : val;
  return roles.reduce(max("position"));
}
