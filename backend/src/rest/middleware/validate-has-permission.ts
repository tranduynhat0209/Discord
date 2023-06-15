import { NextFunction, Request, Response } from "express";
import { APIError } from "../modules/api-error";
import { PermissionTypes } from "../../types";
import { Guild } from "../../data/entity/Guild";

export default (permission: PermissionTypes.Permission) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const guild = res.locals.guild as Guild;
    const members = await deps.guilds.getMembers(guild.id);
    const member = members.find((m) => m.userId === res.locals.user.id);
    if (!member)
      return res.status(401).json({ message: "You are not a guild member" });

    const isOwner = guild.ownerId === res.locals.user.id;
    const hasPerm = await deps.roles.hasPermission(guild, member, permission);
    if (hasPerm || isOwner) return next();

    return res
      .status(401)
      .json({ message: "Missing Permission:" + permission });
  };
