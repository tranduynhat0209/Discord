import { config } from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
config();

import "./modules/deps";
import "./modules/logger";
import { comparePassword } from "./data/utils/password";

deps.dataSource.initialize();
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await deps.users.getByEmail(email);

        if (!user) {
          return done(new TypeError("User Not Found"));
        }
        if (!user.hash) {
          return done(new TypeError("User's Password Hasn't Been Set"));
        }
        const isValid = await comparePassword(password, user.hash);
        if (!isValid) {
          return done(new TypeError("User's Password Is Incorrect"));
        }

        return done(null, user);
      } catch (error) {
        // console.log((error as any).message);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});
passport.deserializeUser((id, done) => {
  deps.users
    .get(id as string)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});
