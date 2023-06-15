import { REST, UserTypes } from "../../types";
import { Router } from "express";
import updateUser from "../middleware/update-user";
import validateUser from "../middleware/validate-user";
import { User } from "../../data/entity/User";
import { In, Like } from "typeorm";
import { Channel } from "../../data/entity/Channel";
import { Guild } from "../../data/entity/Guild";
import { Guild_Member } from "../../data/entity/Guild-member";
import { Role } from "../../data/entity/Role";

export const router = Router();

router.get("/", updateUser, validateUser, async (req, res) => {
  const knownUsers = await deps.users.getKnown(res.locals.user.id);
  res.json(knownUsers);
});

router.get("/count", async (req, res) => {
  const count = await deps.dataSource.getRepository(User).count();
  res.json(count);
});

router.get("/check-username", async (req, res) => {
  const username = req.query.value?.toString().toLowerCase();
  const exists = await deps.dataSource.getRepository(User).exist({
    where: {
      username: Like(`%${username}%`),
    },
  });
  res.json(exists);
});

router.get("/check-email", async (req, res) => {
  const email = req.query.value?.toString().toLowerCase();
  const exists = await deps.dataSource.getRepository(User).exist({
    where: {
      email: Like(`%${email}%`),
      verified: true,
    },
  });
  res.json(exists);
});

router.get("/self", updateUser, validateUser, async (req, res) =>
  res.json(res.locals.user)
);

router.get("/entities", updateUser, validateUser, async (req, res) => {
  const user: UserTypes.Self = res.locals.user;
  const guildIds = user.guildIds;
  console.log(guildIds);
  try {
    const [channels, guilds, members, roles] = await Promise.all([
      deps.dataSource.getRepository(Channel).find({
        where: {
          guildId: In(guildIds),
        },
      }),
      deps.dataSource.getRepository(Guild).find({
        where: {
          id: In(guildIds),
        },
      }),
      deps.dataSource.getRepository(Guild_Member).find({
        where: {
          guildId: In(guildIds),
        },
      }),
      deps.dataSource.getRepository(Role).find({
        where: {
          guildId: In(guildIds),
        },
      }),
    ]);

    let unsecureUsers: User[] = [];
    for (let guildId of guildIds) {
      const users = await deps.guilds.getUsers(guildId);
      unsecureUsers = unsecureUsers.concat(users);
    }
    const secureUsers = Array.from(
      new Set(unsecureUsers.map((u: any) => deps.users.secure(u)))
    );

    res.json({
      channels,
      guilds,
      members,
      roles,
      // themes,
      users: secureUsers,
    } as REST.Return.Get["/users/entities"]);
  } catch (err) {
    res.status(404).json((err as TypeError).message);
  }
});

router.get("/:id", async (req, res) => {
  const user = await deps.users.get(req.params.id);
  res.json(user);
});
