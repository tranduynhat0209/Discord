import { UserTypes } from "../types";

export class EmailFunctions {
  public async verifyCode(user: UserTypes.Self) {
    try {
      const expiresIn = 5 * 60 * 1000;
      const code = deps.verification.create(user.email, "LOGIN", {
        expiresIn,
        codeLength: 6,
      });

      await deps.email.send(
        "verify",
        {
          expiresIn,
          user,
          code,
        },
        user.email as string
      );
    } catch {}
  }
  public async verifyEmail(emailAddress: string, user: UserTypes.Self) {
    try {
      const expiresIn = 24 * 60 * 60 * 1000;
      const code = deps.verification.create(emailAddress, "VERIFY_EMAIL", {
        expiresIn,
      });
      await deps.email.send(
        "verify-email",
        {
          expiresIn,
          user,
          code,
        },
        emailAddress
      );
    } catch {}
  }
  public async forgotPassword(emailAddress: string, user: UserTypes.Self) {
    try {
      const expiresIn = 1 * 60 * 60 * 1000;
      const code = deps.verification.create(emailAddress, "FORGOT_PASSWORD", {
        expiresIn,
      });
      await deps.email.send(
        "forgot-password",
        {
          expiresIn,
          user,
          code,
        },
        emailAddress
      );
    } catch {}
  }
}
