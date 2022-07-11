// to encrypt password

import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

//to check plain text password matches the encrypted password

export async function verifyPassword(password, hashedPassword) {
  const isvalid = await compare(password, hashedPassword);
  return isvalid;
}