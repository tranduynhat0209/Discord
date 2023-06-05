import { Router } from "express";
import passport from "passport";
import { APIError } from "../modules/api-error";
import { patterns } from "../../types";
import { extraRateLimit } from "../modules/rate-limiter";
import { REST } from "../../types";
import { User } from "../../data/entity/User";

export const router = Router();

router.post(
  "/login",
  extraRateLimit(20),
  (req, res, next) => {
    req["flash"] = (_: string, message: string) =>
      res.status(400).json({ message });
    next();
  },
  passport.authenticate("local", {
    failWithError: true,
    failureFlash: "Invalid email or password",
  }),
  async (req, res) => {
    const user = await deps.users.getByEmail(req.body.email);
    if (!user) throw new APIError(400, "Invalid credentials");
    else if (user.locked) throw new APIError(403, "This account is locked");
    else if (user.verified) {
      await deps.emailFunctions.verifyCode(user as any);
      return res.status(200).json({
        message: "Check your email for a verification code",
      });
    }
    res.status(201).json({ token: await deps.users.createToken(user) });
  }
);

router.post("/register", extraRateLimit(10), async (req, res) => {
  const user = (await deps.users.create({
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  }));

  await deps.emailFunctions.verifyEmail(user.email, user);

  res.status(201).json(await deps.users.createToken(user));
});

router.get("/verify", extraRateLimit(20), async (req, res) => {
  const email = deps.verification.getEmailFromCode(req.query.code as string);
  const user = await deps.dataSource.manager.findOneBy(User, { email });
  if (!email || !user) throw new APIError(400, "Invalid code");

  const code = deps.verification.get(email);
  if (!code) throw new APIError(400, "Invalid code");

  deps.verification.delete(email);

  if (code.type === "FORGOT_PASSWORD") {
    await deps.users.setPassword(user.id, code.value);
    res.json({ message: "Password reset" });
  } else if (code.type === "VERIFY_EMAIL") {
    user.verified = true;
    await deps.users.save(user);
    res.json({ message: "Email verified" });
  } else if (code.type === "LOGIN")
    res.json({ token: await deps.users.createToken(user) });
});

router.get("/email/forgot-password", extraRateLimit(10), async (req, res) => {
  const email = req.query.email?.toString();
  if (!email) throw new APIError(400, "Email not provided");
  const isValid = patterns.email.test(email);
  if (!isValid) throw new APIError(400, "Email is not in a valid format");

  try {
    const user = await deps.users.getByEmail(email);
    const selfUser = await deps.users.exportUserSelf(user);
    await deps.emailFunctions.forgotPassword(email, selfUser);
  } finally {
    return res.status(200).json({ message: "Email sent" });
  }
});

router.post("/change-password", extraRateLimit(10), async (req, res) => {
  const {
    email,
    oldPassword,
    newPassword,
  }: REST.Params.Post["/auth/change-password"] = req.body;

  const user = await deps.users.getByEmail(email);
  if (!user) throw new APIError(400, "User not found");
  if (!user.verified) throw new APIError(400, "Please verify your account");

  await deps.users.changePassword(user.id, oldPassword, newPassword);

  return res.status(200).json({
    message: "Password changed",
    token: await deps.users.createToken(user),
  } as REST.Return.Post["/auth/change-password"]);
});
