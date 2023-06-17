import { AppDataSource } from "./utils/data-source";
import Users from "./users";
import Guilds from "./guilds";
import Channels from "./channels";
import { ChannelTypes, PermissionTypes } from "../types";
import Roles from "./roles";
import GuildMembers from "./guild-members";
import Invites from "./invites";
import "../app";
import { faker } from "@faker-js/faker";
import Messages from "./messages";
import { config } from "dotenv";
import DMChannels from "./direct-message";
config();

AppDataSource.initialize().then(async () => {
  console.log("Initialized");

  const users = new Users();
  for (let i = 1; i <= 20; i++) {
    await users.create({
      email: `user${i}@gmail.com`,
      username: faker.person.fullName(),
      password: "123456",
    });
  }
  console.log("Add user done");

  const guilds = new Guilds();
  for (let i = 1; i <= 10; i++) {
    const owner = await users.getByEmail(`user${i}@gmail.com`);
    const guild = await guilds.create({
      id: `guild_id_${i}`,
      name: faker.company.name(),
      ownerId: owner.id,
    });
    console.log(guild);
  }
  console.log("Add guilds done");

  const channels = new Channels();
  for (let i = 1; i <= 10; i++) {
    const guild = await guilds.get(`guild_id_${i}`);
    const channel = await channels.create({
      id: `channel_TEXT_id_${i}`,
      guildId: guild.id,
      name: faker.company.name(),
      type: ChannelTypes.Type.TEXT,
    });
    console.log(channel);
  }
  console.log("Add DM channels done");

  const roles = new Roles();
  const text_permission =
    PermissionTypes.Permission.MANAGE_MESSAGES |
    PermissionTypes.Permission.READ_MESSAGES |
    PermissionTypes.Permission.SEND_FILES |
    PermissionTypes.Permission.SEND_MESSAGES;
  for (let i = 1; i <= 10; i++) {
    const guild = await guilds.get(`guild_id_${i}`);
    const role = await roles.create(guild.id, {
      name: `role_text_permission`,
      permissions: text_permission,
    });
    console.log(role);
  }

  const guild_members = new GuildMembers();
  for (let i = 1; i <= 10; i++) {
    const guild = await guilds.get(`guild_id_${i}`);
    const user1 = await users.getByEmail(`user${i + 1}@gmail.com`);
    const user2 = await users.getByEmail(`user${i + 2}@gmail.com`);
    const guild_member = await guild_members.create({
      guildId: guild.id,
      userId: user1.id,
    });
    await guild_members.create({ guildId: guild.id, userId: user2.id });
    console.log(guild_member);
  }

  console.log("Add users to guild done");

  const invites = new Invites();
  for (let i = 1; i <= 10; i++) {
    const guild = await guilds.get(`guild_id_${i}`);
    const inviter = await users.getByEmail(`user${i}@gmail.com`);
    const invitess = await invites.create(
      { guildId: guild.id, options: { maxUses: 10 } },
      inviter.id
    );
    console.log(invitess);
  }

  console.log("Add invites done");

  const msg = new Messages();
  for (let i = 1; i <= 10; i++) {
    const channel = await channels.get(`channel_DM_id_${i}`);
    const author1 = await users.getByEmail(`user${i}@gmail.com`);
    const author2 = await users.getByEmail(`user${i + 1}@gmail.com`);
    const msgs = await msg.create(author1.id, channel.id, {
      content: faker.lorem.sentence(),
    });
    await msg.create(author2.id, channel.id, {
      content: faker.lorem.sentence(),
    });
    console.log(msgs);
  }

  console.log("Add messages done");

  const dm = new DMChannels();
  const dm0 = await dm.create({
    userId0: "456840954117173248",
    userId1: "457095546696437760",
  });
  console.log(dm0);
});
