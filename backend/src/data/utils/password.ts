import bcrypt from "bcrypt";
import { patterns } from "../../types";

export async function generateSalt(saltRounds?: number) {
  const round = saltRounds ?? 10;
  return await bcrypt.genSalt(round);
}
export async function hashPassword(plaintextPassword: string, salt: string) {
  return await bcrypt.hash(plaintextPassword, salt);
}
export async function comparePassword(plaintextPassword: string, hash: string) {
  return await bcrypt.compare(plaintextPassword, hash);
}
export function isPasswordValid(plaintextPassword: string) {
  return patterns.password.test(plaintextPassword);
}
