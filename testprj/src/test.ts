import { AppDataSource } from "./utils/data-source";
import { User } from "./entity/User";
import { Guild } from "./entity/Guild";
import { Guild_Member } from "./entity/Guild-member";
import { Channel } from "./entity/Channel";
import { Message } from "./entity/Message";
import { Role } from "./entity/Role";
import { Theme } from "./entity/Theme";
import Users from "./Users";

const runner = new Users();

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.username = "Timber";
    // user.password = "123456";
    // user.email = "i@i";
    // user.isActive = true;
    // user.avatarURL = "https://i.imgur.com/3u0f3YB.png";
    const user = await runner.create(
      "Timbered",
      "123456",
      "i@i",
      true,
      "https://i.imgur.com/3u0f3YB.png"
    );
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await runner.getAll();
    console.log("Loaded users: ", users);
    console.log("user at id 1:", await runner.get(1));
    console.log("user at email i@i:", await runner.getByEmail("i@i"));
    console.log("add guild");
    console.log("find user guilds:", await runner.findUserGuilds(1));

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );
  })
  .catch((error) => console.log(error));
