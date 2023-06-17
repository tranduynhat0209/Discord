export namespace PermissionTypes {
  export enum Permission {
    CONNECT = 1 << 13,
    READ_MESSAGES = 1 << 12,
    SEND_FILES = 1 << 11,
    SEND_MESSAGES = 1 << 10,
    MANAGE_MESSAGES = 1 << 9,
    VIEW_CHANNELS = 1 << 8,
    MANAGE_INVITES = 1 << 7,
    CREATE_INVITE = 1 << 6,
    KICK_MEMBERS = 1 << 5,
    MANAGE_CHANNELS = 1 << 4,
    MANAGE_ROLES = 1 << 3,
    MANAGE_GUILD = 1 << 2,
    ADMINISTRATOR = 1,
  }

  export type PermissionString = keyof typeof Permission;

  export const defaultPermissions =
    Permission.VIEW_CHANNELS | Permission.CREATE_INVITE;

  export function getPermString(integer: number | string): string {
    return typeof integer === "string"
      ? Object.entries(Permission).find(
          ([k, v]) => k === integer || v === integer
        )?.[0] ?? ""
      : integer.toString();
  }

  export function getPermNumber(name: string): number {
    return Permission[name];
  }
}
